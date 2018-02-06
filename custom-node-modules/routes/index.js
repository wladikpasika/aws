const express = require('express'),
    router = express.Router(),
    idCheck = require('./models/users').FindUserById,
    getAvatar = require('./models/avatars').FindAvatarById,
    updateAbout = require('./models/users').UpdateById,
    getUsers = require('./models/users').FindUserByStatus,
    multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    storage = multer.diskStorage({
        destination:'./public/upload',
        filename:(req,file,callback)=>{
            "use strict";
            callback(null, file.fieldname +'-'+ Date.now()+path.extname(file.originalname));
        }}),
    upload = multer({

        storage: storage,
        limits:{fileSize: 1000000},
        fileFilter: function(req, file, cb){
            checkFileType(file, cb)
        }
    }).single('myImage'),

    imageUploadToDB = require('./helpers/imageupload');



// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    let filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    let mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}




router.get('/', AutCheck,(req,res)=>{
    "use strict";
 res.render('main');
});


router.get(`/:id`,(req,res)=>{

    "use strict";
    if(req.isAuthenticated()){

        if(req.params.id.match(/-\d+$/gi)!==null) {

            let pageId = req.params.id.match(/-\d+$/gi)[0].replace('-', ''),
                config = {
                    userProfile: null,
                    owner: +pageId === +req.user.id,
                    path:null,
                    nonRootUsers:null,
                    superUser:false
                };
            if(req.user.status==='SuperUser'){config.superUser = true;
                getUsers().then((resolve)=>{
                    config.nonRootUsers = resolve;
                }, (reject)=>{return console.log('Ошибка поиска пользователей')})
            }

            idCheck(pageId).then((user) => {

                config.userProfile = user;

                getAvatar(pageId).then((av)=>{
                    console.log('- строка 79', av);

                    if(av!== null&&av.image_path!== null){

                        return fs.writeFile(av.image_path, av.image,(err)=>{

                        if(!err){

                            config.path = '/'+av.image_path;

                            if(req.get('X-Requested-With')){
                                res.send(200, config)
                            }
                            else{
                                res.render('profile', config);
                            }

                        }});
                    }
                    else{
                        return res.render('profile', config);
                    }
                });

            }, (reject) => {
                console.log("Ошибка поиска пользователя");
                return res.send(404);
            });
        }
    else{res.redirect('/users/login')}
    }
    else{res.redirect('/users/login')}
});


function AutCheck(req,res, next){
    "use strict";
    if(req.isAuthenticated()){
       return res.redirect(`/users/main/${req.user.name+'-'+req.user.id}`);
    }
    else{
        res.redirect('/users/login');
    }
}

router.post('/upload', (req,res)=>{
    "use strict";

        upload(req,res,(err)=>{

            if(err) {res.render('profile', {msg:err})}

            else{

                imageUploadToDB(req.file,req.user.id).then((resolve)=>{


                    if(req.get('X-Requested-With')){
                        return res.send(resolve)
                    }

                    else{

                        fs.unlink(req.file.path,function(error){
                            if (error) throw error;
                        });

                        return  res.redirect(`/users/main/${req.user.name+'-'+req.user.id}`)
                    }


                },(reject)=>{console.log('!!!Ошибка', reject)});
            }
        })
});
router.post('/update-about',(req,res)=>{
    "use strict";
    return updateAbout(req.body,req.user.id)
        .then((resolve)=>{res.send(200,{resolve})},(reject)=>{return send(404,{reject})});
});

router.get('/delete/:id',(req,res)=>{
    "use strict";
    let id = req.params.id.match(/-\d+$/gi)[0].replace('-','');

    if(req.user.status ==='SuperUser'&&req.user.id!==+id){
        updateAbout({ban:true},id).then((resolve)=>{
            res.send(200, resolve)
        }, (reject)=>{
            res.send(404, reject)
        });
    }
    else{
        res.send(401);
    }
});

router.get('/allow/:id',(req,res)=>{
    "use strict";
    let id = req.params.id.match(/-\d+$/gi)[0].replace('-','');

    if(req.user.status ==='SuperUser'&&req.user.id!==+id){
        updateAbout({ban:false},id).then((resolve)=>{
            res.send(200, resolve)
        }, (reject)=>{
            res.send(404, reject)
        });
    }
    else{
        res.send(401);
    }
});



module.exports = router;