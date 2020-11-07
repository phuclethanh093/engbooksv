const { resolve, reject } = require("bluebird");
var Promise = require('bluebird');

var EncodeStringToHex = function(pString){
    return new Promise((resolve, reject) => {
        var result = "";
        var hex;
        for(var i = 0; i < pString.length; i++){
            hex =  pString.charCodeAt(i).toString(16);
            result += ("000" + hex).slice(-4);
        }
        resolve(result);
    });
}

var HexToString = function(pHexString){
    return new Promise((resolve, reject) => {
        var hex = pHexString.toString();//force conversion
        var str = '';
        for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        resolve(str)
    })
}

function getArgs(func) {
    // First match everything inside the function argument parens.
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
   
    // Split the arguments string into an array comma delimited.
    return args.split(',').map(function(arg) {
      // Ensure no inline comments are parsed and trim the whitespace.
      return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
      // Ensure no undefined values are added.
      return arg;
    });
  }

function Compare2ArrayWithKey(arr1, arr2){
    return new Promise((resolve, reject) => {
        for(var key in arr1){
            var strKey = key.toString();
            if(arr2.indexOf(strKey) < 0){
                reject();
            }
        }
        resolve();
    });
}

module.exports = {
    EncodeStringToHex: EncodeStringToHex,
    HexToString: HexToString,
    getArgs: getArgs,
    Compare2ArrayWithKey: Compare2ArrayWithKey,
}