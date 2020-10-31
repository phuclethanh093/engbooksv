const mvcCoreModule = require('./../components/MVCCore');
class BaseController {

}
BaseController.prototype.render = function(pathView){
    mvcCoreModule.render(pathView);
}

module.exports = BaseController;