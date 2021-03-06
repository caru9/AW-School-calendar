var Group = require('../models/groupmodel'); 
var Student = require('../models/studentmodel'); 

// display 
exports.viewcluster = function(req,res){
    Group.display(function(data1){
        let grouplist = data1; 
        Student.display(function(data2){
            let studentlist=data2; 
             Group.display_form(function(data3){
                 let uniquegroup=data3; 
                 res.render('cluster.ejs',{grouplist:grouplist,
                    studentlist:studentlist,
                    uniquegroup:uniquegroup});
             })
        }); 
    }); 
}; 
// group create 
exports.creategroup = function(req,res) {
    var idclass = req.body.idclass; 
    var newgroup = new Group (idclass); 
    Group.create(newgroup,function(err){
        if(err) {
            res.status(404).send(err); 
        } else {
            res.redirect('/home/cluster'); 
            console.log('group added'); 
        }
    }); 
}; 

//groupe delete
exports.deletegroup = function(req,res){
    var idclass = req.params.idclass; 
    Group.delete(idclass, function(err){
        if(err) {
            res.status(404).send(err); 
        } else {
            res.redirect('/home/cluster'); 
            console.log('group deleted'); 
        }
    })
}



// student create 
exports.createstudent = function(req,res) {
    var firstname = req.body.firstname; 
    var lastname = req.body.lastname; 
    var class_name = req.body.class_name; 
    var newstudent = new Student (firstname, lastname, class_name);
    Student.create(newstudent,function(err){
        if(err) {
            res.status(404).send(err); 
        } else {
            res.redirect('/home/cluster'); 
            console.log('student added'); 
        }
    }); 
}; 

// student delete
exports.deletestudent = function(req,res){
    var idstudent = req.params.idstudent; 
    Student.delete(idstudent, function(err){
        if(err) {
            res.status(404).send(err); 
        } else {
            res.redirect('/home/cluster'); 
            console.log('student deleted'); 
        }
    });
}; 
