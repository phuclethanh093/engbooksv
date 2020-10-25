//Load module
const fs = require('fs');
const path = require('path')

var CurrentRootDir = "";
var ControllerPath = "";
var ViewPath = "";
var ModelPath = "";

const listControllers = [];

var InitControllers = function(callback){
    var result;
    fs.readdir(path.join(this.CurrentRootDir, this.ControllerPath), (err, files) => {
      files.forEach(file => {
          if(file.concat('.js')){
              try{
              var filename = file.replace('.js','');
              this.listControllers[filename] = require(filename);
              }
              catch(ex){
                  result = {
                      result : false,
                      message : filename + ' controller is not exist!'
                  }
                  callback(result);
              }
          }
      },function(){
        result = {
            result : true,
            message : 'Initial list controller success!'
        }
        callback(result);
      })
    });
}

GetListControllers = function(){
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
}
