var Promise = require('bluebird');
const { resolve, reject } = require('bluebird');
var routerModule = require('./../components/MVCRouter');
var baseController = require('./../objects/BaseController');



var main = function() {
    baseController.call(this);
    this.main = function(){
        return new Promise((resolve, reject) => {
            resolve(routerModule.renderS("pages/index.ejs"));
        });
    }
}

module.exports = main;