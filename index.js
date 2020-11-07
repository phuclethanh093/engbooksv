const path = require('path');
const PORT = process.env.PORT || 5000
const mvcCore = require('./lib/MViC/components/MVCCore');

// let dbclient = require('./lib/SQLiteHelperJS/objects/DatabaseClient');
// let dbObj = require('./lib/SQLiteHelperJS/objects/DataObject');
// dbclient.InitDatabase("phuctest3");

// mvcCore.app.use(mvcCore.express.static(path.join(__dirname, 'public')));
// mvcCore.app.set('views', path.join(__dirname, 'views'));
// mvcCore.app.set('view engine', 'ejs');
// mvcCore.listMapRoute = {
//   "/home" : {
//     controllerName : "home",
//     action: "homepage"
//   },
// }
// mvcCore.app
//   .get('*', (req, res) => 
//   {
//       var mUrl = req.originalUrl;
//       mvcRouterModule.DecodeUrl(mUrl).then(function(result){
//         mUrl = result;
//         var controllerStObj = mvcCore.listMapRoute[mUrl];
//         if(controllerStObj == undefined){
//           res.status(404);
//           res.render('404', { url: req.url});
//           return;
//         }
        
//         var controllerName = controllerStObj.controllerName;
//         var action = controllerStObj.action;
//         var controllerObj = mvcCore.GetListControllers()[controllerName];
//         var instance = new controllerObj();
        
//         instance[action]().then(function(result){
//           res.render(result.viewPath, {ViewData : result.ViewData});
//         });
//       }, function(error){
//           res.status(404);
//           res.render('404', { url: req.url});
//           return;
//       });
//   })
//   .listen(PORT, function(){
//     mvcCore.CurrentRootDir = __dirname;
//     mvcCore.ControllerPath = 'controllers';
//     mvcCore.ViewPath = __dirname + "/views";
//     mvcCore.InitControllers().then(function(result){

//     }, function(error){

//     });
//   });

mvcCore.app.use(mvcCore.express.static(path.join(__dirname, 'public')));
  mvcCore.SetViewEnginee('ejs').then(function (data){
  mvcCore.SetViewDirectory(path.join(__dirname, 'views')).then(function(res){
    mvcCore.listMapRoute = {
      "/home" : {
        controllerName : "home",
        action: "homepage"
      },
    };
    mvcCore.CurrentRootDir = __dirname;
    mvcCore.ControllerPath = 'controllers';
    mvcCore.ViewPath = __dirname + "/views";
      mvcCore.InitControllers().then(function(res2){
      mvcCore.InitRequestRoute().then(function(res3){
        mvcCore.startServer(PORT);
      });
    });
  });
});

