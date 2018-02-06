const express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    register= require('./helpers/register'),
    router = express.Router(),
    loginCheck = require('./models/users').FindUser,
    idCheck = require('./models/users').FindUserById;




router.get('/registration',(req,res)=>{
    "use strict";
    console.log(req.user,"юзер", res.locals);
    res.render('register');
});

/*router.get(`/${req.user}`)*/

router.get('/login',(req,res)=>{
    "use strict";
    res.render('login');
});

router.get('/thanks',(req,res)=>{
    res.render('thanks');
});

router.post('/register',(req,res)=>{

    return register.register(req,res);
});

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 idCheck(id).then((resolve)=>{
     "use strict";
done(null, resolve)}
,(reject)=>{
     "use strict";
done(reject)});
});


passport.use(new LocalStrategy({usernameField:'name', passwordField: 'password'},

    function(username, password, done){

        "use strict";
        loginCheck({name:username, password:password}, 'compare').then((resolve)=>{

            if(typeof (resolve)==='object'){
                return done(null, resolve, {message:'Вы вошли в систему'})}

            if(resolve === 'user not exist') {console.log('user not exist');return done(null, false, {message: "Пользователь не существует"})}
            else if(resolve === 'incorrect password'){console.log('неправильный пароль');return done(null, false, {message: "Неправильный пароль"})}
            else {return done(null,false)}
        }, (reject)=>{return reject})
    }
));

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send(404, 'user not found') }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            if(req.get('X-Requested-With')){
                return res.send(200, user)
            }
            else{
                res.redirect(`/users/main/${req.user.name+'-'+req.user.id}`)
            }

        });
    })(req, res, next);
});
router.get('/logout', function(req,res){
    "use strict";
    req.logout();
    if(!req.user) {
    req.flash('success_msq','Вы вышли из системы');
    res.redirect('/users/login')}
    else res.redirect('/users/main');
});


module.exports = router;

