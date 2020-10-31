const path = require('path');
const PORT = process.env.PORT || 5000
const mvcCore = require('./lib/MViC/components/MVCCore');
const mvcRouterModule = require('./lib/MViC/components/MVCRouter');

// let dbclient = require('./lib/SQLiteHelperJS/objects/DatabaseClient');
// let dbObj = require('./lib/SQLiteHelperJS/objects/DataObject');
// dbclient.InitDatabase("phuctest3");

mvcCore.app.use(mvcCore.express.static(path.join(__dirname, 'public')));
mvcCore.app.set('views', path.join(__dirname, 'views'));
mvcCore.app.set('view engine', 'ejs');

mvcCore.app
  .get('*', (req, res) => 
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
    // var controllers = mvcCore.GetListControllers();
    // controllers["home"].homepage;
    // console.log(mvcCore.express());
      console.log(req.originalUrl)
      res.render("pages/index");
      res.end();  
  })
  .listen(PORT, function(){
    mvcCore.CurrentRootDir = __dirname;
    mvcCore.ControllerPath = 'controllers';
    mvcCore.ViewPath = __dirname + "/views";
    mvcCore.InitControllers(function(res){
      if(res.result == true){
          mvcRouterModule.SetHashMode(1, function(res2){
        });
      }
    });
  });

