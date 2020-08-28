var Lesson = require('../models/lessonmodel'); 
var Group = require('../models/groupmodel'); 

// view - get lesson page populated 


exports.viewlesson = function(req,res){
        userid = 1;    
        //req.session.userid; 
    Lesson.display(userid, function(data){
        let lessonlist = data;  
        Group.display_form(function(data2,err){
            let uniquegroup = data2; 
            if (err){ 
                res.status(400).json({'message' : error }); 
            } else{
                console.log(lessonlist); 
                res.json({"lessonlist":lessonlist,"uniquegroup":uniquegroup}); 
            }
    });  
}); 
};




// create lesson (post on ../addlesson)



exports.createlesson = function(req,res) {
    var weekday = req.body.weekday; 
    var hour = req.body.hour; 
    var teacher_id = 1; 
    var class_name = req.body.class_name; 
    var newlesson = new Lesson (weekday,hour,teacher_id,class_name); 
    Lesson.create(newlesson,function(err){
        if(err) {
            res.status(404).json({'message':err}); 
        } else {
            res.status(200).json({'message':'lesson recorded'}); 
            console.log('lesson added'); 
        }    
    }); 
}; 

// delete selected lesson



exports.deletelesson = function(req,res) {
    var idlesson = req.params.lessonid;
    console.log(idlesson); 
    Lesson.delete(idlesson, function(err) {
        if(err) {
            res.status(400).json({'message' : err }); 
        } else {
            res.status(200).json({'message':'lesson deleted'}); 
            console.log('lesson deleted'); 
        }  
    }); 
}; 



exports.alterlesson = function(req,res) {
    var idlesson= req.params.lessonid; 
    console.log(idlesson); 
    Lesson.displaymodify(idlesson, function(data1){
        let funlesson = data1;
        console.log("modified in process"); 
        Group.display_form(function(data2,err){
            let uniquegroup = data2; 
            if(err) {
                res.status(404).json({'message':err}); 
            } else { 
                res.json({"funlesson":funlesson,"uniquegroup":uniquegroup});
            }  
        }); 
    });  
}; 


exports.updatelesson= function(req,res) {
    var idlesson= req.params.lessonid; 
    var weekday = req.body.weekday; 
    var hour = req.body.hour; 
    var class_name = req.body.class_name; 
    Lesson.modify(weekday,hour,class_name,idlesson, function(err) {
        if(err) {
            res.status(404).json({'message':err}); 
        } else {
            res.status(200).json({'message':'OK'}); 
            console.log('lesson updated'); 
        }  
    }); 
}
