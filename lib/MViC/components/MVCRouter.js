var StringUtilityModule = require('./StringUtility');

var listUrl = [];

var hashMode = 0;
var prefixUrl = "";
var hashUrl = "";
var responseHttp;
var requestHttp;

var SetHashMode = function(pMode, cabllback) {
    this.hashMode = pMode;
}

var SetPrefixUrl = function(pPrefix, callback) {
    this.prefixUrl = pPrefix;
}

var DecodeUrl = function(pUrl) {
    if (this.hashMode == 1) {
        return new Promise((resolve, reject) => {
            StringUtilityModule.EncodeStringToHex(pUrl).then(function(data){
                resolve(data);
            }, function(error){
                resolve("404");
            });
        });
    };

    return new Promise((resolve, reject) => {
        resolve(pUrl);
    });
}

var EncodeUrl = function(pUrl, callback) {
    if (this.hashMode == 1) {
        StringUtilityModule.HexToString(pHexString, function(res) {
            callback(res);
        });
    }
}

var render = function(viewPath, viewData = undefined){
    return {
        viewPath: viewPath,
        viewData: viewData
    }
}

module.exports = {
    SetHashMode: SetHashMode,
    SetPrefixUrl: SetPrefixUrl,
    DecodeUrl: DecodeUrl,
    EncodeUrl: EncodeUrl,
    render: render,
}