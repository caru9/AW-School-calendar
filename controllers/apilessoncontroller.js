var Lesson = require('../models/lessonmodel'); 
var Group = require('../models/groupmodel'); 


exports.viewlesson = function(req,res){
    userid = 1 
Lesson.display(userid, function(data){
    let lessonlist = data;  
    Group.display_form(function(data2){
        let uniquegroup = data2; 
        res.json({lessonlist:lessonlist,uniquegroup:uniquegroup});
    })

});  
}; 

exports.createlesson = function(req,res) {
    var weekday = req.body.weekday; 
    var hour = req.body.hour; 
    var teacher_id = 1
    var class_name = req.body.class_name; 
    var newlesson = new Lesson (weekday,hour,teacher_id,class_name); 
    Lesson.create(newlesson,function(err){
        if(err) {
            res.status(404).json({'message':error}); 
        } else {
            res.status(200).json({'message':"ALL gooad"}); 
      
        }
    }); 
}; 

// delete selected lesson
exports.deletelesson = function(req,res) {
    var idlesson = req.params.lessonid;
    console.log(idlesson); 
    Lesson.delete(idlesson, function(err) {
        if(err) {
            res.status(404).json({'message':error}); 
        } else {
            res.status(200).json({'message':"ALL gooad"}); 
      
        }
    }); 
}; 


