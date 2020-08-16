var Lesson = require('../models/lessonmodel'); 
var Group = require('../models/groupmodel'); 

// view - get lesson page populated 
exports.viewlesson = function(req,res){
        userid = req.session.userid; 
    Lesson.display(userid, function(data){
        let lessonlist = data;  
        Group.display_form(function(data2){
            let uniquegroup = data2; 
            res.render('lesson.ejs', {lessonlist:lessonlist,uniquegroup:uniquegroup});
        })

    });  
}; 

// create lesson (post on ../addlesson)
exports.createlesson = function(req,res) {
    var weekday = req.body.weekday; 
    var hour = req.body.hour; 
    var teacher_id = req.session.userid; 
    var class_name = req.body.class_name; 
    var newlesson = new Lesson (weekday,hour,teacher_id,class_name); 
    Lesson.create(newlesson,function(err){
        if(err) {
            res.status(404).send(err); 
        } else {
            res.redirect('/home/lesson'); 
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
            res.status(404).send(err); 
        } else {
            res.redirect('/home/lesson'); 
            console.log('lesson deleted'); 
        }
    }); 
}; 


exports.alterlesson = function(req,res) {
    var idlesson= req.params.lessonid; 
    Lesson.displaymodify(idlesson, function(data1){
        let funlesson = data1;
        Group.display_form(function(data2){
            let uniquegroup = data2; 
            res.render('updatelesson.ejs', {funlesson:funlesson,
            uniquegroup:uniquegroup});
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
            res.status(404).send(err); 
        } else {
            res.redirect('/home/lesson'); 
            console.log('lesson ipdated'); 
        }
    }); 
}

