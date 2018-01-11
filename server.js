const http = require('http');
const url = require('url');
const routes = require('./custom-node-modules/routes/routes-for-home-page');
const postParse = require('./custom-node-modules/Email/parsePostMessage');
const port = 80;
const querystring = require('querystring');

const server = http.createServer(function (request, response) {

    "use strict";
    response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});


    let path = url.parse(request.url, true);

    if(request.method === 'POST'&&path.pathname == '/email-message'){

        postParse.postParse(request, response);

    }
    else if(request.method === 'GET'){

        routes.conditions(path, response);
    }
});

server.listen({
    'port':port,
});
console.log(port,' - порт');


