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
        var mParam = [];
        for (let [key, value] of Object.entries(mArr1)) {
            if((key in mArr2) == false){
                reject();
            }

            if (value == undefined || value == "") {
                reject();
            }
            mExist[key] = value;
        }
        var mValue ="";
        for (let [key, value] of Object.entries(mArr2)) {
            if (value != "" || (key in mExist) == true) {
                if(value != ""){
                    mValue = value;
                }
                if((key in mExist) == true){
                    mValue = mExist[key];
                }
                mParam.push(mValue);
                continue;
            } else {
                reject();
            }
        }
        resolve(mParam);
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
            reject();
        };
        resolve();
    })
}

var ConvertArrayToJsonArray = function(pArray) {
    var JSArray = {};
    pArray.forEach(function(item, value) {
        if (item.indexOf("=") < 0) {
            JSArray[item] = '';
        } else {
            var arr = item.toString().split("=");
            var mKey = arr[0].trim().replace(/'/g,"");
            var mValue = arr[1].trim().replace(/'/g,"");
            JSArray[mKey] = mValue;
        }
    });
    return JSON.parse(JSON.stringify(JSArray));
}

var FormatCurrentDateYYYYMMDD = function () {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

function GenerateID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = {
    EncodeStringToHex: EncodeStringToHex,
    HexToString: HexToString,
    getArgs: getArgs,
    Compare2JSONArrayObjectWithKeyRequest: Compare2JSONArrayObjectWithKeyRequest,
    CheckEmptyArray: CheckEmptyArray,
    CheckEmpty2Array: CheckEmpty2Array,
    ConvertArrayToJsonArray: ConvertArrayToJsonArray,
    FormatCurrentDateYYYYMMDD : FormatCurrentDateYYYYMMDD,
    GenerateID: GenerateID,
}