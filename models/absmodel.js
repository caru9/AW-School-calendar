'use strict'; 
var mysql = require('mysql');
let sql=require('../config/schooldb');

class Abs {
    constructor(lesson_id,student_id,date){
        this.lesson_id = lesson_id; 
        this.student_id = student_id;
        this.date = date; 
    }
}; 

Abs.create = function(newabs,result) {
    sql.query('INSERT INTO absences SET ?', newabs,function(err){
    if (err) {
       return result(err,null); 
    } else{ 
      return result(null); 
    }
    }); 
}


// retrieve id_student from name & first name 
Abs.retrievestud = function(firstname,lastname,result) {
    sql.query('SELECT idstudent FROM students WHERE firstname =TRIM(?) AND lastname=TRIM(?)', [firstname, lastname], function(err,row) {
        if (err)
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };


Abs.retrievedisplay = function(student_id,result) {
    sql.query('SELECT date, lesson_id FROM absences WHERE student_id =?', student_id, function(err,row) {
        if (err) 
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };

 
   



module.exports=Abs; 
// TO do abs.dsiplay 