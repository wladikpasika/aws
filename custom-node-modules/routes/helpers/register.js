const connection = require('../models/users').Registration,
avatarRow = require('../models/avatars').Registration;

module.exports = {

    register:function(req,res){
    let name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        password2 = req.body.password2;

    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'password2 is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        if(req.get('X-Requested-With')){
            res.send(404,errors);
        }
        else{
            res.render ('register',{
                errors:errors
            })
        }

    }
    else {
        if(password===password2){
            connection(req.body).then((resolve)=>{avatarRow({user_id:resolve.id});
            if(req.get('X-Requested-With')){res.send(200,resolve)}
            return res.redirect(`/users/main/login`)
            },(reject)=>{return res.send(409, reject.errors[0].message)});}
        else{
            if(req.get('X-Requested-With')){
               return res.send(404, 'incorrect password')
            }
            else{
                res.redirect(`/users/registration`)
            }
        }

    }
}
};

