var Lesson = require('../models/lessonmodel'); 
var Group = require('../models/groupmodel'); 

// view - get lesson page populated 
exports.viewlesson = function(req,res){
        userid = req.session.userid; 
        userid=1; 
    Lesson.display(userid, function(data){
        let lessonlist = data;  
            res.json({lessonlist:lessonlist});
    });  
}; 



