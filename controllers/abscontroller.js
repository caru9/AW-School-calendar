var Lesson = require('../models/lessonmodel'); 
var Student = require('../models/studentmodel'); 
var Abs = require('../models/absmodel'); 


exports.viewabs = function(req,res) {
    idteacher = req.session.userid; 
    Lesson.display(idteacher, function(data1){
        let lessonlist = data1;  
        Student.display(function(data2){
            let studentlist=data2;
            res.render('absence.ejs', {lessonlist:lessonlist,
                                    studentlist:studentlist});
    }); 
});  
}; 

exports.createabs = function(req,res) {
    var idlesson = req.body.selectedlesson; 
    var date = req.body.date; 
    var brosseur = req.body.brosseur; 
    console.log(brosseur); 
    array = brosseur['i']; 
    res.locals.array = array; 
    array.forEach(function (item) { 
        var newabs = new Abs (idlesson, item, date); 
        Abs.create(newabs, function(err){
            if(err) {
                res.status(404).send(err); 
            } else {
                console.log("abs recorded"); 
            }
        }); 
    }); 
    res.redirect('/home/abs');  
};    


exports.retrieveabs = function(req,res,next) {
     var firstname = req.body.firstname; 
     var lastname = req.body.lastname; 
     res.locals.studentfirst = req.body.firstname; 
     res.locals.studentlast = req.body.lastname; 
     Abs.retrievestud(firstname,lastname, function(data1){
         console.log(data1); 
         student_id = data1[0].idstudent; 
         Abs.retrievedisplay(student_id, function(data2){
             res.locals.abslist=data2; 
             next(); 
         });  
     });
 }   

 exports.display = function(req,res){
     var abslist=res.locals.abslist; 
     var studentfirst = res.locals.studentfirst; 
     var studentlast=res.locals.studentlast; 
     console.log(abslist); 
         res.render('absdisplay.ejs',{first:studentfirst, last:studentlast,abslist:abslist}); 
}
