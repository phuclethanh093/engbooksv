//Load module
const fs = require('fs');
const path = require('path')

var CurrentRootDir = "";
var ControllerPath = "";
var ViewPath = "";
var ModelPath = "";

var listControllers;
var listMapRoute;

var InitControllers = function(callback){
    var result;
    fs.readdir(path.join(this.CurrentRootDir, this.ControllerPath), (err, files) => {
        this.listControllers = {};
        var promise = new Promise((resolve, reject) => { 
            files.forEach(file => {
                if(file.concat('.js')){
                    try {
                        var filename = file.replace('.js','');
                        var filepath = path.join(this.CurrentRootDir, this.ControllerPath).split("\\").join("/") + "/" + filename;
                        this.listControllers[filename] = require(filepath);
                    }
                    catch(ex){
                        result = {
                            result : false,
                            message : filename + ' controller is not exist!'
                        }
                        callback(result);
                    }
                }
                if(files.indexOf(file) === files.length - 1){
                    resolve();
                }
            })    
        });

        promise.then(() => {
            result = {
                result : true,
                message : "Initialize controllers success!"
            }
            callback(result);
        });
    });
}

var ReadFileRouteConfig = function(pPathFileConfig){
    
}

GetListControllers = function(callback){
    var lst = this.listControllers;
    callback(lst);
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
    ReadFileRouteConfig: ReadFileRouteConfig
}
