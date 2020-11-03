//Load module
const express = require('./../external_libs/express');
const app = express();
const fs = require('fs');
const path = require('path')
var Promise = require('bluebird');

var CurrentRootDir = "";
var ControllerPath = "";
var ViewPath = "";
var ModelPath = "";

var listControllers;
var listMapRoute;

var InitControllers = function(){
    return new Promise((resolve, reject) => {
        var result;
        fs.readdir(path.join(this.CurrentRootDir, this.ControllerPath), (err, files) => {
            this.listControllers = {};
            files.forEach(file => {
                if(file.concat('.js')){
                    try {
                        var filename = file.replace('.js','');
                        var filepath = path.join(this.CurrentRootDir, this.ControllerPath).split("\\").join("/") + "/" + filename;
                        const controllerObj = require(filepath);
                        this.listControllers[filename] = controllerObj;
                    }
                    catch(ex){
                        result = {
                            result : false,
                            message : filename + ' controller is not exist!'
                        }
                        reject(result);
                    }
                }
                if(files.indexOf(file) === files.length - 1){
                    resolve();
                }
            })    
        });
    }, function(error){
        reject(error);
    });
}

var ReadFileRouteConfig = function(pPathFileConfig){
    
}

var GetListControllers = function(){
    var lst = this.listControllers;
    return lst;
}

module.exports = {
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
}
