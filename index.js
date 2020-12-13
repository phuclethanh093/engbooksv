const path = require('path');
const PORT = process.env.PORT || 5000
const mvcCore = require('./lib/MViC/components/MVCCore');
var mvcConst = require('./lib/MViC/components/MVCConst');

mvcCore.app.use(mvcCore.express.static(path.join(__dirname, 'public')));
  mvcCore.SetViewEnginee('ejs').then(function (data){
  mvcCore.SetViewDirectory(path.join(__dirname, 'views')).then(function(res){
    mvcCore.LoadFileMapRoute('./lib/MViC/configs/router_map.cfg').then(function(res2){
      mvcCore.CurrentRootDir = __dirname;
      mvcCore.ControllerPath = 'controllers';
      mvcCore.ViewPath = __dirname + "/views";
      mvcConst.ViewPath = __dirname + "/views";
        mvcCore.InitControllers().then(function(res3){
        mvcCore.InitRequestRoute().then(function(res4){
          mvcCore.startServer(PORT);
        });
      });
    });
  });
});

