const bcrypt = require('bcrypt'),
    Sequelize = require('sequelize'),
    Op = Sequelize.Op,
    saltRounds = 10,
    connection = require('./config').connection;

    Users = connection.define('users', {
        name: {
            unique: true,
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
        },
        status:{ //status может быть user, ban, superuser
            type: Sequelize.STRING,
            defaultValue: 'user'
        },
        first_name:{
            type: Sequelize.STRING,
            defaultValue: 'Имя?'
        },
        last_name:{
            type: Sequelize.STRING,
            defaultValue: 'Фамилия?'
        },
        about:{
            type: Sequelize.TEXT
        },
        ban:{
            type: Sequelize.BOOLEAN,
            defaultValue: false

    }
    });

module.exports.Registration = function(_body_req){
    "use strict";

    return connection.sync().then(function(){

       return bcrypt.hash(_body_req.password, saltRounds).then(function(hash) {
            // Store hash in your password DB.
            "use strict";
            _body_req.password = hash;
           return Users.create(_body_req)

        });
    });
};
module.exports.FindUserById = function(id){
    "use strict";
   return connection.sync().then(()=>{
            return Users.findOne({ where: {id: id}}).then((resolve) => {
                    return resolve.get({plain:true})},
                (reject)=>{console.log('Ошибка поиска в базе'); return false})
        },
        (err)=>{console.log('ошибка соединия с базой'); return err});
};
module.exports.FindUser = function(user, co){

    return connection.sync().then(()=>{
            console.log(user.name);

            return Users.findOne({ where: {name: user.name}}).then((resolve) => {

                    if(resolve === null){
                        return 'user not exist'}
                    ///сравнение пароля и хэша по запросу
                    if(co === 'compare') {
                        return bcrypt.compare(user.password, resolve.password).then((result) => {
                                if (result) {
                                    return resolve}

                                else {return 'incorrect password'}
                            },
                            (reject) => {console.error('Ошибка с bcrypt'); return reject});
                    }
                    else {return resolve}
                },
                (reject)=>{console.error('ошибка поиска в базе'); return reject})},

        (err)=>{console.error('ошибка соединия с базой'); return err;
        });
};
module.exports.UpdateById = function(newData, userId){
    "use strict";
    return connection.sync().then(function(){
        return Users.update(newData,{
            where:{id:userId}//name or id or email
        }).then((resolve)=>{

            return resolve},(reject)=>{

            return reject}

            );

    });
};
module.exports.FindUserByStatus = function(){
    "use strict";
    let array = [];

    return connection.sync().then(function(){

        return Users.findAll({ where:
            {
                status: 'user'
            }
        }).then((resolve)=>{
            "use strict";
            resolve.forEach((item)=>{
                array.push (item.get({plain: true}));
            });
            return array;
        }, (reject)=>{
            console.log('Ошибка');
        });

    });
};
