const sqlite3 = require('sqlite3').verbose();
const { resolve, reject } = require('bluebird');
const path = require('path');
var Promise = require('bluebird');

var ConnectDatabase = function(nameDB){
  return new Promise((resolve, reject) => {
    var res = new sqlite3.Database(path.join(__dirname,'./../../../db/' + nameDB + '.db'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        res = {
          result : false,
          message : 'Connect Fail!'
        }
        reject(res)
      }
      resolve(res);
    });
  }) 
}

var CloseConnection = function(db){
  return new Promise((resolve, reject) =>{
      var res;
      db.close((err) => {
          if (err) {
            res = {
              result : false,
              message : 'Close connection fail!'
            }
            reject(res)
          }
          res = {
            result: true,
            message: 'Close connection success'
          }
          resolve(res);
      });
  });
}

module.exports = {
    ConnectDatabase,
    CloseConnection,
};