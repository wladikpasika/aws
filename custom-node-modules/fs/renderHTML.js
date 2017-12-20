var fs = require('fs');

module.exports ={
    renderHTML: function (path, response, type) {
    "use strict";

    fs.readFile(path, function (error, data) {

        function writeHeaders(code,inData, output, type){

            if(!type||code===404){inData.writeHead(code)}
            else {inData.writeHead(code, {'Content-type': type})}
            inData.write(output);
            inData.end();
        }

        if (error) {
            writeHeaders(404,response, 'not-found, maybe src was deleted', type)
        }
        else {
            if(type == 'image/jpeg'){
                writeHeaders(200, response, data, type)
            }
            else if(type == 'text/css'){
                writeHeaders(200, response, data, type)
            }
            else{
                writeHeaders(200, response, data, type)
            }
        }

    })
}};