const express = require('express'),
    port = 80,
    portSsl = 443,
    bodyParser = require('body-parser'),
    compression = require('compression'),
    fs = require('fs'),
    https = require('https'),
    path = require('path'),
    directoryToServe = 'client',
    mysqlReq = require('./custom-node-modules/req-to-DB/connection'),
    sendMail = require('./custom-node-modules/Email/sendEmail'),

    httpOptions = {
        cert: fs.readFileSync(__dirname+'/ssl/fullchain1.pem'),
        key: fs.readFileSync(__dirname+'/ssl/privkey1.pem')
    };


const app = express();

app.listen (port);
https.createServer(httpOptions, app).listen(portSsl);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(compression());
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/public', express.static(__dirname+'/public'));
app.use('/.well-known/acme-challenge', express.static(__dirname+'/public'));

app.use(function(req,res,next){
    "use strict"

    if(req.method === 'POST'&&req.path == '/email-message'){

        sendMail.send(req.body, res);
    }
    else {

        if (!req.query.slider) {
            switch (req.url) {
                case '/':
                    res.sendFile(__dirname + '/index.html');
                    break;

                case '/vacantions':
                    res.sendFile(__dirname + '/index.html');
                    break;

                case '/favicon.png':
                    res.sendFile(__dirname + '/favicon.png');
                    break;

                case '/robots.txt':
                    res.sendFile(__dirname + 'robots.txt');
                    break;

                case '/sitenap.xml':
                    res.sendFile(__dirname + 'sitemap.xml');
                    break;
                default:{
                    next();
                }
            }
        } else {
            mysqlReq.requestToDb(res, req.query.slider);
        }
    }});

app.use(function(req,res){
    "use strict";
    res.send(404, ' Sorry, But Page Not Found')

});

console.log('server run on port: 80; ssl on port 443');

