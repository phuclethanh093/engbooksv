const { resolve, reject } = require("bluebird");
var Promise = require('bluebird');

var EncodeStringToHex = function(pString) {
    return new Promise((resolve, reject) => {
        var result = "";
        var hex;
        for (var i = 0; i < pString.length; i++) {
            hex = pString.charCodeAt(i).toString(16);
            result += ("000" + hex).slice(-4);
        }
        resolve(result);
    });
}

var HexToString = function(pHexString) {
    return new Promise((resolve, reject) => {
        var hex = pHexString.toString(); //force conversion
        var str = '';
        for (var i = 0;
            (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        resolve(str)
    })
}

function getArgs(func) {
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    return args.split(',').map(function(arg) {
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
        return arg;
    });
}

function Compare2JSONArrayObjectWithKeyRequest(arr1, arr2) {
    return new Promise((resolve, reject) => {
        var mArr1 = arr1;
        var mArr2 = arr2;
        var mExist = {};
        for (let [key, value] of Object.entries(mArr1)) {
            var i = mArr2.indexOf(key);
            if (i < 0) {
                reject();
            }

            if (value == undefined || value == "") {
                reject();
            }
            mExist[key] = value;
        }
        for (let [key, value] of Object.entries(mArr2)) {
            if (value != "" || mExist.indexOf(key) >= 0) {
                continue;
            } else {
                reject();
            }
        }
        resolve();
    });
}

var CheckEmptyArray = function(pArr) {
    return new Promise((resolve, reject) => {
        if (pArr == {} || pArr == undefined || pArr.length == undefined || pArr.length == 0) {
            reject();
        };
        resolve();
    })
}

var CheckEmpty2Array = function(pArr, pArr2) {
    return new Promise((resolve, reject) => {
        var strArr = JSON.stringify(pArr);
        var strArr2 = JSON.stringify(pArr2);
        if (strArr == "{}" || strArr == "") {
            reject();
        };

        if (strArr2 == "{}" || strArr2 == "") {
            console.log(strArr2)
            reject();
        };
        resolve();
    })
}

var ConvertArrayToJsonArray = function(pArray) {
    var strJSArray = "{ ";
    var strParam = "";
    pArray.forEach(function(item, value) {
        if (strParam != "") {
            strParam += ", ";
        }
        if (item.indexOf("=") < 0) {
            strParam += item.trim() + ": ''";
        } else {
            var arr = item.toString().split("=");
            strParam += arr[0].trim() + ": " + arr[1].trim();
        }
    });
    strJSArray += strParam + " }";
    return JSON.parse(JSON.stringify(strJSArray));
}

module.exports = {
    EncodeStringToHex: EncodeStringToHex,
    HexToString: HexToString,
    getArgs: getArgs,
    Compare2JSONArrayObjectWithKeyRequest: Compare2JSONArrayObjectWithKeyRequest,
    CheckEmptyArray: CheckEmptyArray,
    CheckEmpty2Array: CheckEmpty2Array,
    ConvertArrayToJsonArray: ConvertArrayToJsonArray,
}