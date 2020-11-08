//Load module
const express = require('./../external_libs/express');
const app = express();
const fs = require('fs');
const path = require('path')
const mvcRouterModule = require('./MVCRouter');
var Promise = require('bluebird');
var getParams = require('./../external_libs/get-params-master');
const mvcStringUtility = require('./StringUtility');
const getFunctionArguments = require('get-function-arguments')
const convert = require('array-to-json');

var CurrentRootDir = "";
var ControllerPath = "";
var ViewPath = "";
var ModelPath = "";

var listControllers;
var listMapRoute;

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

var InitRequestRoute = function() {
    let obj = this;
    return new Promise((resolve, reject) => {
        this.app.get('*', (req, res) => {
            try {
                var query = JSON.parse(JSON.stringify(req.query));
                var mUrl = req.originalUrl.split("?")[0];
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
                    mvcStringUtility.CheckEmpty2Array(query, params).then(function(res3) {
                        mvcStringUtility.Compare2JSONArrayObjectWithKeyRequest(query, params).then(function(res4) {
                            instance().then(function(result) {
                                res.render(result.viewPath, { ViewData: result.ViewData });
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
                    })
                }, function(error) {
                    res.status(404);
                    res.render('404', { url: req.url });
                    return;
                });
            } catch (ex) {
                res.status(404);
                res.render('404', { url: req.url });
                return;
            }
        })
        resolve();
    });
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
    ReadFileRouteConfig: ReadFileRouteConfig,
    express: express,
    app: app,
    InitRequestRoute: InitRequestRoute,
    startServer: startServer,

}