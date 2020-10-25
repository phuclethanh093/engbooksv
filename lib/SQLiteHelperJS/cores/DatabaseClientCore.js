const sqlite3 = require('sqlite3').verbose();
const path = require('path');

var ConnectDatabase = function(nameDB, callback){
  return new sqlite3.Database(path.join(__dirname,'./../../../db/' + nameDB + '.db'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    var res;  
    if (err) {
        res = {
          result : false,
          message : 'Connect Fail!'
        }
      }
      res = {
        result : true, 
        message : 'Connect Success!'
      }
      callback(res);
    });
}

var CloseConnection = function(db, callback){
    var res;
    db.close((err) => {
        if (err) {
          res = {
            result : false,
            message : 'Close connection fail!'
          }
        }
        res = {
          result: true,
          message: 'Close connection success'
        }
        callback(res);
    });
}

module.exports = {
    ConnectDatabase,
    CloseConnection,
};