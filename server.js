const express = require('express');
const port = 80;
const bodyParser = require('body-parser');

const mysqlReq = require('./custom-node-modules/req-to-DB/connection');
const sendMail = require('./custom-node-modules/Email/sendEmail');

const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/public', express.static(__dirname+'/public'));

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

app.listen({
    'port':port,
});
console.log(`Сервер запущен, порт:${port}`);



