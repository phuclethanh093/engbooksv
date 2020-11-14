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
           resolve({test : '1'}); 
        });
    }
}

module.exports = home;