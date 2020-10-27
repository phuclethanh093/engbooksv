var EncodeStringToHex = function(pString, callback){
    var result = "";
    var hex;
    for(var i = 0; i < pString.length; i++){
        hex =  pString.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }
}

var HexToString = function(pHexString, callback){
    var hex = pHexString.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    callback(str);
}

module.exports = {
    EncodeStringToHex: EncodeStringToHex,
    HexToString: HexToString,
}