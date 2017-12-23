const sendEmail = require('./sendEmail');



module.exports={
postParse:(request, response)=>{let body = [];
request.on('data', (chunk) => {
    body.push(chunk);

    if(body.length > 1e6) {
        body = "";
        response.writeHead(413, {'Content-Type': 'text/plain'}).end();
        console.log("Попытка передать большой объем данных");
       return  request.connection.destroy();
    }
}).on('end', () => {
   return sendEmail.send(JSON.parse(Buffer.concat(body).toString()), response);
}
)
}};
