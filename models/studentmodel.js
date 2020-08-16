'use strict'; 
var mysql = require('mysql');
let sql=require('../config/schooldb');

class Student { 
    constructor(firstname,lastname,class_name){
        this.firstname = firstname; 
        this.lastname = lastname; 
        this.class_name = class_name; 
    }
}; 


Student.create = function(newstudent,result) { 
    sql.query('INSERT INTO students SET ?', newstudent, function(err){
    if (err) {
       return result(err,null); 
    } else{ 
      return result(null); 
    }
    }); 
}

Student.display = function(result) {
    sql.query('SELECT * FROM students',function(err,row) {
        if (err) 
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };


Student.delete = function(idstudent, result) {
    sql.query('DELETE FROM students WHERE idstudent=?', idstudent, function(err){
        if (err)
            return result(err); 
        else {
            return result(null); 
        }    
    }); 
}; 
module.exports=Student; 