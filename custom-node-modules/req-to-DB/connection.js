var mysql = require('mysql');

module.exports = {

    connectConfig: {
       /* host: '127.0.0.1',*/
        port: '3306',
        user: 'wlad',
        password: '000000',
        database: 'World_Emigration'
    },

    connections: function(){return mysql.createConnection(this.connectConfig)},

    requestToDb:function(response, query){

        "use strict";
        console.log('SELECT * FROM '+ query);
        this.connections().query('SELECT * FROM '+query, function (err, result) {

            "use strict";
            if (err) {
                console.error(err);
                response.end('Ошибка соединения с базой данных -', err);
                return;
            }
            response.writeHead(200,{'Content-Type': 'application/json'})
            response.end(JSON.stringify(result));
        })
    }
};

/*вариант с закрытием соединения после получения данных - нужно создавать заново объект  соединения*/

/*
var Connection = {
        host: '127.0.0.1',
        port: '3306',
        user: 'wlad',
        password: '000000',
        database: 'World_Emigration'
};
//var ConnectToMysql = function(Connection){return mysql.createConnection(Connection)};
function mysqlReq(connection, response) {
    //var connection =  new ConnectToMysql(Connection);
    // connection.connect()
    connection.query('SELECT * FROM main_slider', function (err, result) {
        "use strict";
        if (err) {
            console.error(err);
            return;
        }
        //console.log(result);
        //connection.end();
        response.end(JSON.stringify(result));

    })
};*/
