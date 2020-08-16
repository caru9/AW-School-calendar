var User = require('../models/usermodel'); // include model 
const bodyParser = require('body-parser'); // include body-parser

 


exports.checklog = function(req,res,err) {
    var email = req.body.email; 
    var password = req.body.password; 
    User.check_log(email,password, function(data){
        if (data.length > 0) {
                res.json({'data':'data'});  
        } else {
            res.status(404).json({message:err}); 
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
                res.status(404).json({'message':err}); 
            } else {
                res.status(200); 
                console.log('user added'); 
            }   
    });  
};

exports.userlogout = function(req,res,err) {
    req.session.destroy();  
    if(err) {
           res.status(404).json({'message':err}); 
    } else {
          res.status(200); 
          console.log('session destroyed'); 
        }    
}; 




