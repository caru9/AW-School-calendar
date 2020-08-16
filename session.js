const User = require("./models/usermodel");


//check whether the user is loggedin 
exports.check_loggedin = function(req,res,next){
    idteacher = req.session.userid; 
    if (idteacher) {
        next(); 
    } else {
        res.redirect('/login'); 
    }; 
};  





