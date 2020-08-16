'use strict'; 
var mysql = require('mysql');
let sql=require('../config/schooldb');

class Group {
    constructor(idclass){
        this.idclass=idclass; 
    }  
};

Group.create = function(newgroup,result) { 
    sql.query('INSERT INTO class SET ?', newgroup, function(err){
    if (err) {
       return result(err,null); 
    } else{ 
      return result(null); 
    }
    }); 
}

Group.display_form = function(result) {
    sql.query('SELECT DISTINCT * FROM class', function(err,row) {
        if (err) 
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };

Group.display = function(result){
    sql.query('SELECT class.*, count(students.class_name) as number_of_student FROM class LEFT JOIN students ON (class.idclass=students.class_name) GROUP BY class.idclass', function(err,row) {
        if (err) 
            return result(err); 
		else {
            return result(row); 
		}			
		});
    };


Group.delete = function( idclass, result) {
    sql.query('DELETE FROM class WHERE idclass = ?',idclass, function(err){
        if (err)
            return result(err); 
        else {
            return result(null); 
        }    
    }); 
}; 


module.exports=Group; 

