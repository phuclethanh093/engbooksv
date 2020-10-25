let data = {};

var Count = function(){
    return this.data.length;
}

var GetRowData = function(iRow){
    return this.data[iRow];
}

module.exports = {
    data,
    GetRowData,
    Count
}