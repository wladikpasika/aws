const mysql = require('mysql'),
    connectConfig = {

        acquireTimeout: 10000,
        connectionLimit: 100,
        queueLimit: 50,
        port: '3306',
        user: 'wlad',
        password: '000000',
        database: 'World_Emigration'
    },
    pool = mysql.createPool(connectConfig);



module.exports = {


    requestToDb:function(response, req){

        "use strict";

        pool.getConnection(function(err, connection){

            if(err){
                console.error(err, "Ошибка при подключению к объекту Pool- 21 строка");
                throw err;

            };

            connection.query('SELECT * FROM '+req, function (err, result) {
                connection.release();
                "use strict";
                if (err) {

                    console.error(err, 'database request err');
                    response.send(404,'database request err'); throw err;
                }

                return response.send(JSON.stringify(result));

            })

        })
    }
};
