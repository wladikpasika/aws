const Sequelize = require('sequelize'),

connection = new Sequelize('World_Emigration', 'wlad', '000000',{
        host:'localhost',
        dialect: 'mysql',
        pool: {
            timeout: 5000,
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
        },

    });
module.exports.connection = connection;