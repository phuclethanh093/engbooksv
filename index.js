const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

let dbclient = require('./lib/SQLiteHelperJS/objects/DatabaseClient');
let dbObj = require('./lib/SQLiteHelperJS/objects/DataObject');
dbclient.InitDatabase("phuctest3");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => 
  {
    dbclient.ExecuteQuery("SELECT * FROM users", function(result){
        console.log(__dirname);
        if(result.result == true){
            dbObj = result.dataObject;
            console.log(dbObj);
            res.send('Hello Express ' + dbObj.GetRowData(0).username);
        }
        // res.send('Hello Express');
    });
    // res.render('pages/index')
  
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
