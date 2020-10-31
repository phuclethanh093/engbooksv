const { render } = require('../lib/MViC/external_libs/express/lib/response');
var baseController = require('./../lib/MViC/objects/BaseController');
class home extends  baseController{
    constructor(){
        super();
        this.hompage = function(){
            console.log("test");
            render("pages/index.ejs");
        }
    }
}

module.exports = home