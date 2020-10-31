const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const mvcCore = require('./lib/MViC/components/MVCCore');
const mvcRouterModule = require('./lib/MViC/components/MVCRouter');

// let dbclient = require('./lib/SQLiteHelperJS/objects/DatabaseClient');
// let dbObj = require('./lib/SQLiteHelperJS/objects/DataObject');
// dbclient.InitDatabase("phuctest3");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => 
  {
    // dbclient.ExecuteQuery("SELECT * FROM users", function(result){
    //     console.log(__dirname);
    //     if(result.result == true){
    //         dbObj = result.dataObject;
    //         console.log(dbObj);
    //         res.send('Hello Express ' + dbObj.GetRowData(0).username);
    //     }
    //     // res.send('Hello Express');
    // });
      mvcRouterModule.responseHttp = res;
      mvcRouterModule.responseHttp.render('pages/index');
  })
  .listen(PORT, function(){
    mvcCore.CurrentRootDir = __dirname;
    mvcCore.ControllerPath = 'controllers';
    mvcCore.InitControllers(function(res){
      if(res.result == true){
        mvcRouterModule.SetHashMode(1, function(res2){
        });
        mvcRouterModule.requestHttp = express.request;
        mvcRouterModule.responseHttp = express.response;

        //Set route
        // mvcCore.listMapRoute = {
        //   "/Home" : mvcCore.GetListControllers[Home].Index,
        // }
      }
    });

    
  });

