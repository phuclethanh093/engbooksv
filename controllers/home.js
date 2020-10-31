const mvcRouterModule = require('./lib/MViC/components/MVCRouter');

var home = function (){
    mvcRouterModule.responseHttp.render('pages/index');
}