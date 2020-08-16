var User = require('../models/usermodel'); // include model 
const bodyParser = require('body-parser'); // include body-parser

exports.viewlogin = function(req,res) {
    res.render('login.ejs');
}; 

exports.viewregister = function(req,res){
    res.render('register.ejs'); 
}; 

exports.viewhomepage = function(req,res){
    res.render('homepage.ejs'); 
}; 

exports.checklog = function(req,res,next) {
    var email = req.body.email; 
    var password = req.body.password; 
    User.check_log(email,password, function(data){
        if (data.length > 0) {
                console.log("pffffffffff"); 
               req.session.userid = data[0].idteacher; 
               req.session.userfirst=data[0].first; 
               req.session.userlast=data[0].last; 
                next();  
        } else {
            res.send("Wrong credentials <a href='/login'> Se reconnecter"); 
        }
    });
};  

exports.register = function(req, res) {
        var firstname = req.body.firstname; 
        var lastname = req.body.lastname; 
        var email=req.body.email; 
        var password = req.body.password;
        var newuser = new User (firstname,lastname,email,password); 
        User.create(newuser, function(err){
            if(err) {
                res.status(404).send(err); 
            } else {
                res.redirect('/login'); 
                console.log('user added'); 
            }   
    });  
};

exports.userlogout = function(req,res) {
    req.session.destroy();  
    console.log("log out"); 
    res.redirect('/login');  
}; 

exports.tohome = function(req,res){
    res.redirect('/home'); 
}; 



