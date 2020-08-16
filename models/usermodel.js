var mysql = require('mysql');
let sql=require('../config/schooldb');

class User {
    constructor(firstname,lastname, email,password){
        this.firstname = firstname; 
        this.lastname = lastname; 
        this.email = email; 
        this.password = password; 
}
}; 

// check if user is in db when want to log 
// better understanding of why it doesn't work when drop off results ? 
User.check_log = function(email, password,result) {
    sql.query('SELECT * FROM teachers WHERE email =? AND password =?', [email, password], function(err,row) {
        if (err) return result(err); 
        else {
            return result(row); 
        } 
}); 
}


// when creating new account 
User.create = function(newuser,result) { 
    sql.query('INSERT INTO teachers SET ?', newuser, function(err){
    if (err) {
       return result(err,null); 
    } else{ 
      return result(null); 
    }
    }); 
};


module.exports = User;