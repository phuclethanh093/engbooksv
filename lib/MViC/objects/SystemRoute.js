var mainController = require('./../controllers/main');

var ListRoute = {
    "/home" : { controller :new mainController(), action: "main" }
}

module.exports.ListRoute = ListRoute;