const Sequelize = require('sequelize'),
    connection = require('./config').connection;

    Avatars = connection.define('avatars', {
        user_id: {
            unique: true,
            type:Sequelize.INTEGER
        },
        image_name:{
            type: Sequelize.STRING
        },
        image_path:{
            type: Sequelize.STRING
        },
        image_mime:{
            type: Sequelize.STRING
        },
        original_name:{
            type: Sequelize.STRING
        },
        destination:{
            type: Sequelize.STRING
        },
        image:{
            type: Sequelize.BLOB('medium'),
        }
    });

module.exports.Registration = function(avatar){
    "use strict";

    return connection.sync().then(function(){
        
            "use strict";
            Avatars.create(avatar).then(()=>{console.log('Строка изображения создана');
            },(reject)=>{
                console.log('Ошибка добавления изображения', reject);
                })
    });
};
module.exports.FindAvatarById = function(id){
    "use strict";
   return connection.sync().then(()=>{
            return Avatars.findOne({ where: {user_id: id}}).then((resolve) => {
                    return resolve},
                (reject)=>{console.error('Ошибка поиска в базе'); return false})
        },
        (err)=>{console.error('ошибка соединия с базой'); return err});
};


module.exports.UpdateById = function(newData, userId){
    "use strict";
    return connection.sync().then(function(){

        return Avatars.update(newData,{
            where:{user_id:userId}//name or id or email
        }).then((resolve)=>{
            return resolve},(reject)=>{
            return reject
        });

    });
};

