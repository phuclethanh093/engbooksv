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

var DecodeUrl = function(pUrl, callback) {
    if (this.hashMode == 1) {
        StringUtilityModule.EncodeStringToHex(pUrl, function(res) {
            callback(res);
        });
    };
}

var EncodeUrl = function(pUrl, callback) {
    if (this.hashMode == 1) {
        StringUtilityModule.HexToString(pHexString, function(res) {
            callback(res);
        });
    }
}

module.exports = {
    SetHashMode: SetHashMode,
    SetPrefixUrl: SetPrefixUrl,
    DecodeUrl: DecodeUrl,
    EncodeUrl: EncodeUrl,
}

module.exports.responseHttp = responseHttp;
module.exports.requestHttp = requestHttp;