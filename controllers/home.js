var routerModule = require('./../lib/MViC/components/MVCRouter');
var baseController = require('./../lib/MViC/objects/BaseController');
// class home extends  baseController{
//     constructor(){
//         super();
        
//     }

//     homepage(callback){
//         render.render("/pages/")
//         return;
//     }   
// }

var home = function() {
    baseController.call(this);
    this.homepage = function(callback){
        var res = routerModule.render("pages/index.ejs");
        callback(res);
    }
}

module.exports = home