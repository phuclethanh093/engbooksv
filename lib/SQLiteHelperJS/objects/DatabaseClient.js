let dbclientcore = require('./../cores/DatabaseClientCore');
let dbObj = require('./DataObject');
var Promise = require('bluebird');
const { resolve, reject } = require('bluebird');

let db;
let dbName;
var InitDatabase = function(nameDB){
    dbName = nameDB;
}

var Connect = function(callback){
    return new Promise((resolve, reject) => {
        db = dbclientcore.ConnectDatabase(dbName).then(function(result){
            resolve(result);
        }, function(error){
            reject();
        });
    })
}

var ExecuteQuery = function(pQuery){
    return new Promise((resolve, reject) => {
        Connect().then(function(res){
                db.all(pQuery, [], (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    dbObj.data = rows;
                    res = dbObj;
                    Close().then(function(res2){
                        dbObj.data = rows;
                        var result = {
                            result : true,
                            message : 'Query success!',
                            dataObject : dbObj
                        }
                        resolve(result);
                    })
                        
                });
            }
        , function(error){
            reject();
        })
    });
}

var Close = function(){
    return new Promise((resolve, reject) => {
        dbclientcore.CloseConnection(db);
        resolve();
    })
}

module.exports = {
    InitDatabase,
    ExecuteQuery,
};