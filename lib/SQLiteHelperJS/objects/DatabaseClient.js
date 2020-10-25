let dbclientcore = require('./../cores/DatabaseClientCore');
let dbObj = require('./DataObject');
let db;
let dbName;
var InitDatabase = function(nameDB){
    dbName = nameDB;
}

var Connect = function(callback){
    db = dbclientcore.ConnectDatabase(dbName, function(res){
        callback(res);
    });
}

var ExecuteQuery = function(pQuery, callback){
    Connect(function(res){
        if(res.result == true){
            db.all(pQuery, [], (err, rows) => {
                if (err) {
                  throw err;
                }
                dbObj.data = rows;
                res = dbObj;
                Close(function(res){
                    if(res.result == true){
                        dbObj.data = rows;
                        var result = {
                            result : true,
                            message : 'Query success!',
                            dataObject : dbObj
                        }
                        callback(result);
                    }
                })
            });
        }
    });
}

var Close = function(callback){
    dbclientcore.CloseConnection(db, function(res) {
        callback(res);
    });
}

module.exports = {
    InitDatabase,
    ExecuteQuery,
};