const express = require('express'),
    exphbs = require('express-handlebars'),
    port = 80,
    portSsl = 443,
    bodyParser = require('body-parser'),
    compression = require('compression'),
    fs = require('fs'),
    https = require('https'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    mysqlReq = require('./custom-node-modules/req-to-DB/connection'),
    sendMail = require('./custom-node-modules/Email/sendEmail'),
    routes = require('./custom-node-modules/routes/index'),
    users = require("./custom-node-modules/routes/users"),
    path = require('path'),

    httpOptions = {
        cert: fs.readFileSync(__dirname+'/ssl/rabota_com_ua/fullchain1.pem'),
        key: fs.readFileSync(__dirname+'/ssl/rabota_com_ua/privkey1.pem')
    };

/*Инициализируем приложение*/

const app = express();

app.listen (port);
https.createServer(httpOptions, app).listen(portSsl);
/*Вьюхи*/
app.set('views', path.join(__dirname,'views'));
app.engine('hbs', exphbs(
    {
        extname:'hbs',
        defaultLayout:'layout',
        layoutsDir:path.join(__dirname,'views/layouts')
    }));
app.set('view engine', 'hbs');
/*бодипарсеры*/
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());

/*Настройка сессий*/
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

/*Инициализация паспорта*/
app.use(passport.initialize());
app.use(passport.session());
/*Настройка валидатора*/
app.use(expressValidator({
    errorFormatter:function(param, msg, value){
        "use strict";
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length){
            formParam += '[' + namespace.shift() +']';
        }

        return{
            param:formParam,
            msg:msg,
            value:value
        }

    }
}));

/*пакуем в зип*/
app.use(compression());
/*статика*/
app.use(function(req,res,next){
    "use strict";

    if(req.protocol ==='http'){

        if(req.url.length>1) {return  res.redirect(301, 'https://'+req.hostname + req.url);}
        else {return  res.redirect(301, 'https://'+req.hostname);}

    }
    if(req.method === 'POST'&&req.path === '/email-message'){

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

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/public', express.static(__dirname+'/public'));
app.use('/.well-known/acme-challenge', express.static(__dirname+'/public'));


/*Флэш*/
app.use(flash());

/*Глобальные переменные*/
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

/*роуты*/
app.use('/users', users);
app.use('/users/main', routes);

/*обработка ошибок и других url*/

app.use(function(req,res){

    "use strict";
    if(req.originalUrl.search(/utm_/i)!==-1){
        res.sendFile(__dirname + '/index.html');
    }
    else
    {
        res.send(404, ' Sorry, But Page Not Found')
    }
});

console.log('Server run on port: 80; ssl on port 443');


