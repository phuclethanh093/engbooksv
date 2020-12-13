var MVCConstModule = require('./MVCConst');
var StringUtilityModule = require('./StringUtility');
var Promise = require('bluebird');
const { resolve, reject } = require('bluebird');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var listUrl = [];

var hashMode = 0;
var prefixUrl = "";
var hashUrl = "";
var responseHttp;
var requestHttp;
var mapRoute = [];
var sysViewPath = "./../views/";

var SetHashMode = function(pMode, cabllback) {
    this.hashMode = pMode;
}

var SetPrefixUrl = function(pPrefix, callback) {
    this.prefixUrl = pPrefix;
}

var DecodeUrl = function(pUrl) {
    if (this.hashMode == 1) {
        return new Promise((resolve, reject) => {
            StringUtilityModule.EncodeStringToHex(pUrl).then(function(data){
                resolve(data);
            }, function(error){
                resolve("404");
            });
        });
    };

    return new Promise((resolve, reject) => {
        resolve(pUrl);
    });
}

var EncodeUrl = function(pUrl, callback) {
    if (this.hashMode == 1) {
        StringUtilityModule.HexToString(pHexString, function(res) {
            callback(res);
        });
    }
}

var GetControllerFromUrl = function(pUrl, pMapRoute){
    return new Promise((resolve, reject) => {

    });
}

var render = function(viewPath, viewData = undefined, layout = "layout"){
    // return {
    //     viewPath: viewPath,
    //     viewData: viewData
    // }
    return new Promise((resolve, reject) => {
        try{
            var mViewPath =  path.join(MVCConstModule.ViewPath , viewPath);
            var mViewLayoutPath =  path.join(MVCConstModule.ViewPath, layout);
            var compiled = ejs.compile(fs.readFileSync(mViewPath, 'utf8'));
            var html = compiled();
            resolve({
                layout: mViewLayoutPath,
                body: html,
                viewData: viewData
            });
        }
        catch(ex){
            resolve({
                layout: mViewLayoutPath,
                body: undefined,
                viewData: viewData
            });
        }
    });
}

var renderS = function(viewPath, viewData = undefined, layout = "layout"){
    return new Promise((resolve, reject) => {
        try{
            var mViewPath =  path.join(__dirname, sysViewPath + viewPath);
            var mViewLayoutPath =  path.join(__dirname, sysViewPath + layout);
            var compiled = ejs.compile(fs.readFileSync(mViewPath, 'utf8'));
            var html = compiled();
            resolve({
                layout: mViewLayoutPath,
                body: html,
                viewData: viewData
            });
        }
        catch(ex){
            resolve({
                layout: mViewLayoutPath,
                body: undefined,
                viewData: viewData
            });
        }
    });
}

module.exports = {
    SetHashMode: SetHashMode,
    SetPrefixUrl: SetPrefixUrl,
    DecodeUrl: DecodeUrl,
    EncodeUrl: EncodeUrl,
    render: render,
    renderS:renderS
}