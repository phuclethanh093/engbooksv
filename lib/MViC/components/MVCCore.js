//Load module
const fs = require('fs');
const path = require('path')

var CurrentRootDir = "";
var ControllerPath = "";
var ViewPath = "";
var ModelPath = "";

var listControllers;

var InitControllers = function(callback){
    var result;
    fs.readdir(path.join(this.CurrentRootDir, this.ControllerPath), (err, files) => {
      files.forEach(file => {
          if(file.concat('.js')){
              try{
              this.listControllers = {};
              var filename = file.replace('.js','');
              var filepath = path.join(this.CurrentRootDir, this.ControllerPath).split("\\").join("/") + "/" + filename;
              this.listControllers[filename] = require(filepath);
              }
              catch(ex){
                  console.log(ex);
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
}
