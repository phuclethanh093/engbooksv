var Promise = require('bluebird');
const { resolve, reject } = require('bluebird');
var routerModule = require('./../lib/MViC/components/MVCRouter');
var baseController = require('./../lib/MViC/objects/BaseController');



var home = function() {
    baseController.call(this);
    this.homepage = function(){
        return new Promise((resolve, reject) => {
            resolve(routerModule.render("pages/index.ejs"));
        });
    }

    this.home2 = function(test, param = '2'){
        return new Promise((resolve, reject) => {
            resolve(routerModule.render("pages/index.ejs"));
        });
    }

    this.test = function(){
        return new Promise((resolve, reject) =>{
            var dbclient = require('./../lib/SQLiteHelperJS/objects/DatabaseClient');
            dbclient.InitDatabase("phuctest3");
            dbclient.ExecuteQuery("SELECT * FROM users").then(function(data){
                resolve({test : data}); 
            }, function(error){
                reject();
            })
        });
    }
}

module.exports = home;