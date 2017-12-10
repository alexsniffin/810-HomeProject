var express = require('express');
//var path = require('path');
var config = require('./config/config');
var logger = require('./config/logger');

var app = express();

require('./config/express')(app, config);

logger.log('info', "Creating HTTP server on port: %s", config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log("HTTP Server listening on port:" + " " + config.port + " " + app.get('env') + "localhost:" + config.port);
});

module.exports = app;