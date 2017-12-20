var url = require('url');
var mysqlReq = require('../req-to-DB/connection');
var readHTML = require('../fs/renderHTML');


module.exports = {

    conditions: function (path, response) {

        if(path.pathname.search(/\/img.+/)!==-1){
            readHTML.renderHTML('.'+path.pathname, response,'image/jpeg');
        }
        else if(path.pathname.search(/\.css/)!==-1){
            readHTML.renderHTML('.'+path.pathname, response, 'text/css');
        }
        else if(path.pathname.search(/\/fonts.+/)!==-1){
            readHTML.renderHTML('.'+path.pathname, response, 'text/css');
        }
        else if(path.pathname.search(/.+\.ico$|.+\.png$|.+\.jpg$/)!==-1){
            readHTML.renderHTML('.'+path.pathname, response, 'image/png');
        }
        else{

        switch (path.pathname) {
            case '/':
                if (path.query.slider) {
                    console.log(path.query, 'то что передаем в обработчик');
                    mysqlReq.requestToDb(response, path.query.slider);

                }
                else {
                    readHTML.renderHTML('./index.html', response, 'text/html')
                }
                break;
            case '/bundle.js':

                readHTML.renderHTML('./bundle.js', response, 'text/html');
                break;

            case '/vacantions':
                readHTML.renderHTML('./index.html', response, 'text/html');
                break;

            default:
                response.writeHead(404);
                response.write('rout-not-found');
                response.end();
        }
    }}
};