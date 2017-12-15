var http = require('http');
var mysql = require('mysql');
var url = require('url');
var routes = require('./custom-node-modules/routes/routes-for-home-page');
var readHTML = require('./custom-node-modules/fs/renderHTML');

var server = http.createServer(function (request, response) {

    "use strict";
    response.writeHead(200, {'Content-Type': 'text/html'});

    var path = url.parse(request.url, true);

    routes.conditions(path, response)

});

server.listen(8082, '127.0.0.1');



