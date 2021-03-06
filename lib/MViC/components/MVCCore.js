//Load module
const express = require('./../external_libs/express');
const app = express();
const fs = require('fs');
const path = require('path')
const mvcRouterModule = require('./MVCRouter');
var Promise = require('bluebird');
var getParams = require('./../external_libs/get-params-master');
const mvcStringUtility = require('./StringUtility');
const getFunctionArguments = require('get-function-arguments');
const { resolve, reject } = require('bluebird');
const StringUtility = require('./StringUtility');
const nodemailer = require("nodemailer");

var ListSystemRoute = require("./../objects/SystemRoute").ListRoute;
var resourceRoute = "/resources/";

var CurrentRootDir = "";
var ControllerPath = "";
var ViewPath = "";
var ModelPath = "";
var listMapRoute = {};
var listControllers;
var InitControllers = function() {
    return new Promise((resolve, reject) => {
        var result;
        fs.readdir(path.join(this.CurrentRootDir, this.ControllerPath), (err, files) => {
            this.listControllers = {};
            files.forEach(file => {
                if (file.concat('.js')) {
                    try {
                        var filename = file.replace('.js', '');
                        var filepath = path.join(this.CurrentRootDir, this.ControllerPath).split("\\").join("/") + "/" + filename;
                        const controllerObj = require(filepath);
                        this.listControllers[filename] = controllerObj;
                    } catch (ex) {
                        result = {
                            result: false,
                            message: filename + ' controller is not exist!'
                        }
                        reject(result);
                    }
                }
                if (files.indexOf(file) === files.length - 1) {
                    resolve();
                }
            })
        });
    }, function(error) {
        reject(error);
    });
}

var ReadFileRouteConfig = function(pPathFileConfig) {

}

var GetListControllers = function() {
    var lst = this.listControllers;
    return lst;
}

var SetViewEnginee = function(pName = 'ejs') {
    return new Promise((resolve, reject) => {
        this.app.set('view engine', pName);
        resolve();
    });
}

var SetViewDirectory = function(pPathDirectory) {
    return new Promise((resolve, reject) => {
        this.app.set('views', pPathDirectory);
        resolve();
    });
}

var LoadFileMapRoute = function(pPathFileRoute){
    var obj = this;
    return new Promise((resolve, reject) => {
        fs.readFile(pPathFileRoute, 'utf8', function(err, data){
            if(err){
                fs.writeFile(pPathFileRoute, '//&Url:&Controller:&Action: - Example', function(err){

                });
                
                resolve();
            }
            obj.listMapRoute = readFileRoute(data); 
            resolve();
        });
    });
}

var readFileRoute = function(data){
    var obj = {};
    var strData = data.trim().replace(/^#.*(?:\r\n|\r|\n)/g, '').replace(/(?:\r\n|\r|\n)/g,'');
    var arrData = strData.split(";");
    var length = (arrData.length - 1);
    for(var i = 0; i < length; i+=3){
        var url = arrData[i];
        var controllerNm = arrData[i + 1];
        var action = arrData[i + 2];
        obj[url] = {
            controllerName: controllerNm,
            action : action
        }
    }
    return obj;
}

var InitRequestRoute = function() {
    return new Promise((resolve, reject) => {
        let obj = this;
        this.app.get('*', (req, res) => {
            try {
                var query = JSON.parse(JSON.stringify(req.query));
                var mUrl = req.originalUrl.split("?")[0];
                if(mUrl == "/requestAuthsys" + StringUtility.FormatCurrentDateYYYYMMDD()){
                    var formatdate = StringUtility.FormatCurrentDateYYYYMMDD().toString();
                    var day = parseInt((new Date()).getDate());
                    var strRandom = formatdate.length + formatdate + StringUtility.GenerateID(day);
                    fs.writeFile(__dirname + "./../configs/tokenAuth.cfg",strRandom, function(err){
                    })

                    sendTokenKey(strRandom);

                    res.set('Content-Type', 'text/html');
                    res.send("Generate Token Success");
                    return;
                }

                if(mUrl.indexOf("/sys") >= 0){
                    var formatdate = StringUtility.FormatCurrentDateYYYYMMDD().toString();
                    var arrSys = mUrl.replace("/sys/","").split("/");
                    var token = formatdate.length + formatdate + arrSys[0];
                    var respon = res;
                    fs.readFile(__dirname + "./../configs/tokenAuth.cfg", 'utf8', function(err, data){
                        if(err || token != data){
                            respon.set('Content-Type', 'text/html');
                            respon.send("Your Token is not valid");
                            return;
                        }
                        //Example Auth
                        if(arrSys.length <= 1){
                            respon.set('Content-Type', 'text/html');
                            respon.send("Auth token success!");
                            return;
                        }
                        else {
                            var mURLDecode = mUrl.replace("/sys/" + arrSys[0],"");
                            var controllerObj = obj.ListSystemRoute[mURLDecode].controller;
                            var action = obj.ListSystemRoute[mURLDecode].action;
                            var instance = controllerObj[action];
                            var params = getFunctionArguments(instance);
                            params = mvcStringUtility.ConvertArrayToJsonArray(params);
                            mvcStringUtility.Compare2JSONArrayObjectWithKeyRequest(query, params).then(function(res4) {
                                var context = instance;
                                var functionName = action;
                                execFn(functionName, context, res4).then(function(result) {
                                    if(result.body == undefined){
                                        res.status(404);
                                        res.render('404', { url: req.url });
                                        return;
                                    }
                                    res.render(result.layout,{ body: result.body, ViewData: result.ViewData });
                                    return;
                                });
                            }, function(error) {
                                res.status(404);
                                res.render('404', { url: req.url });
                                return;
                            });

                        }
                    });
                }
                else {
                    if(mUrl.indexOf(resourceRoute) >= 0){
                        res.sendFile(mUrl, { 'root' : __dirname + "/.."});
                        return;
                    }
                    else {
                        if (obj.listMapRoute.length == 0 || obj.listMapRoute == undefined) {
                            res.status(404);
                            res.render('404', { url: req.url });
                        }
                        mvcRouterModule.DecodeUrl(mUrl).then(function(result) {
                            mUrl = result;
                            var controllerStObj = obj.listMapRoute[mUrl];
                            if (controllerStObj == undefined) {
                                res.status(404);
                                res.render('404', { url: req.url });
                                return;
                            }
                            var controllerName = controllerStObj.controllerName;
                            var action = controllerStObj.action;
                            var controllerObj = obj.GetListControllers()[controllerName];
                            var instance = new controllerObj()[action];
                            var params = getFunctionArguments(instance);
                            params = mvcStringUtility.ConvertArrayToJsonArray(params);
                            mvcStringUtility.Compare2JSONArrayObjectWithKeyRequest(query, params).then(function(res4) {
                                var context = instance;
                                var functionName = action;
                                execFn(functionName, context, res4).then(function(result) {
                                    // if(result.viewPath == undefined){
                                    //     res.send(result);
                                    //     return;
                                    // }
                                    // res.render(result.viewPath, { ViewData: result.ViewData });
                                    // return;
                                    if(result.body == undefined){
                                        res.status(404);
                                        res.render('404', { url: req.url });
                                        return;
                                    }
                                    res.render(result.layout,{ body: result.body, ViewData: result.ViewData });
                                    return;
                                });
                            }, function(error) {
                                res.status(404);
                                res.render('404', { url: req.url });
                                return;
                            });
                        }, function(error) {
                            res.status(404);
                            res.render('404', { url: req.url });
                            return;
                        });
                    }
                }
            } catch (ex) {
                res.status(404);
                res.render('404', { url: req.url });
                return;
            }
        })
        resolve();
    });
}

async function sendTokenKey(tokenKey){
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "alexzander.oreilly44@ethereal.email", // generated ethereal user
            pass: "Kd7ZCU1WxHtN5mFpw4", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Alexzander " <alexzander.oreilly44@ethereal.email>', // sender address
        to: "alexzander.oreilly44@ethereal.email", // list of receivers
        subject: "Test Token Key", // Subject line
        text: tokenKey, // plain text body
        html: "HTML:" + tokenKey, // html body
    });
}

function execFn(fnName, ctx /*, args */) 
{
    return new Promise((resolve, reject) => {
    // get passed arguments except first two (fnName, ctx)
    var args = Array.prototype.slice.call(arguments, 2);
    // execute the function with passed parameters and return result
    ctx.apply(ctx, args[0]).then(function(result){
          resolve(result);
      },function(error){
          reject();
      })
    })
}

var startServer = function(pPort) {
    return new Promise((resolve, reject) => {
        this.app.listen(pPort);
        resolve();
    });
}

module.exports = {
    SetViewEnginee: SetViewEnginee,
    SetViewDirectory: SetViewDirectory,
    CurrentRootDir: CurrentRootDir,
    ControllerPath: ControllerPath,
    ViewPath: ViewPath,
    ModelPath: ModelPath,
    InitControllers: InitControllers,
    GetListControllers: GetListControllers,
    listMapRoute: listMapRoute,
    ListSystemRoute:ListSystemRoute,
    ReadFileRouteConfig: ReadFileRouteConfig,
    express: express,
    app: app,
    InitRequestRoute: InitRequestRoute,
    startServer: startServer,
    LoadFileMapRoute: LoadFileMapRoute,
}