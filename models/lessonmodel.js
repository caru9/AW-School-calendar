'use strict'; 
var mysql = require('mysql');
let sql=require('../config/schooldb');

// constructor for lesson 
class Lesson {
    constructor(weekday,hour,teacher_id,class_name){
        this.weekday = weekday; 
        this.hour = hour; 
        this.teacher_id=teacher_id; 
        this.class_name=class_name; 
}
}; 


Lesson.create = function(newlesson,result) { 
    sql.query('INSERT INTO lessons SET ?', newlesson, function(err){
    if (err) {
       return result(err,null); 
    } else{ 
      return result(null); 
    }
    }); 
}

Lesson.display = function(teacher_id,result) {
    sql.query('SELECT idlesson, weekday, hour, class_name FROM lessons WHERE teacher_id =?', teacher_id, function(err,row) {
        if (err) 
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };


Lesson.delete = function(idlesson, result) {
    sql.query('DELETE FROM lessons WHERE idlesson= ?', idlesson, function(err){
        if (err)
            return result(err); 
        else {
            return result(null); 
        }    
    }); 
}; 
 

Lesson.displaymodify = function(idlesson,result) {
    sql.query('SELECT * FROM lessons WHERE idlesson=?', idlesson, function(err,row) {
        if (err) 
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };

Lesson.modify = function(weekday,hour,class_name,idlesson,result) {
    sql.query('UPDATE lessons SET weekday=?, hour=?, class_name=? WHERE idlesson= ?', [weekday,hour,class_name,idlesson], function(err){
        if (err)
            return result(err); 
        else {
            return result(null); 
        }    
    });  
};   

 module.exports=Lesson; 