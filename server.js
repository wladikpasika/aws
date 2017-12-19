var http = require('http');
var url = require('url');
var routes = require('./custom-node-modules/routes/routes-for-home-page');
var readHTML = require('./custom-node-modules/fs/renderHTML');

var server = http.createServer(function (request, response) {

    "use strict";
    response.writeHead(200, {'Content-Type': 'text/html'});

    var path = url.parse(request.url, true);

    routes.conditions(path, response)

});

server.listen({
    'port':80,
});



