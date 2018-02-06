const fs = require('fs');
const update = require('../models/avatars').UpdateById;


let imageToVar = function (file, id){
    "use strict";
  return  new Promise(function(resolve,reject){

       return fs.readFile(file.path,(err,data)=>{

            if(err){console.log('произошла ошибка чтения файла');return err}
            else{
                console.log('!!!Запись файла');
               return update(
                    {
                        image:data,
                        image_name:file.filename,
                        image_mime:file.mimetype,
                        destination:file.destination,
                        original_name:file.originalname,
                        image_path:file.path

                    }, id).then((ok)=>{
                   console.log(ok, 'окей');
                   if(ok[0]===1){return resolve(file.path)}
                   else{
                       return 'upload success error'
                   }

               },(err)=>{return console.log(err, "после ошибки")});

            }
        });
    });
};
/*
imageToVar('/home/wlad/Desktop/Tests/express/aws/public/upload/myImage-1517842689283.jpg', '77', 'lol.jpg').then((rej)=>{console.log('YtУра')},()=>{
    "use strict";
    console.log('ytehf');
});*/

module.exports = imageToVar;

/*update({avatar:'lol'},'1');*/
