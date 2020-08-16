"use strict";

let express=require('express'); 
let router = express.Router(); 




// require controllers module 
// var auth = require('../config/session'); 
var usercontroller = require('../controllers/usercontroller');
var session=require('../session'); 
var lessoncontroller =require('../controllers/lessoncontroller');
var clustercontroller = require('../controllers/clustercontroller'); 
var abscontroller =require('../controllers/abscontroller');
//var logger = require('../config/session'); 
 
router.get('/', function(req,res){
     res.redirect('/login');
}); 



// ----------------------------------USER Routes--------------------// 
// for login & register
router.get('/login',usercontroller.viewlogin); 
router.get('/register', usercontroller.viewregister); 
router.post('/register', usercontroller.register); 

router.post('/auth',[usercontroller.checklog, usercontroller.tohome]); 

//for logout 
router.get('/logout',usercontroller.userlogout);

// for homepage
router.get('/home',[session.check_loggedin,usercontroller.viewhomepage]);
//add middelware if own module session 
//logger.logger_info

//------------------------- LESSON ROUTE -----------------------//
router.get('/home/lesson',[session.check_loggedin,lessoncontroller.viewlesson]);
//session.idcurrent
router.post('/home/lesson/addlesson',[session.check_loggedin,lessoncontroller.createlesson]); 
//session.idcurrent
router.post('/home/lesson/deletelesson/:lessonid',[session.check_loggedin,lessoncontroller.deletelesson]); 
router.post('/home/lesson/alterlesson/:lessonid',[session.check_loggedin,lessoncontroller.alterlesson]); 
router.post('/home/lesson/updatelesson/:lessonid',lessoncontroller.updatelesson); 


//---------------------- CLUSTER (GROUP & STUDENT) ROUTES ------------// 
router.get('/home/cluster',[session.check_loggedin,clustercontroller.viewcluster]); 
router.post('/home/cluster/addgroup',[session.check_loggedin,clustercontroller.creategroup]); 
router.post('/home/cluster/addstudent',[session.check_loggedin,clustercontroller.createstudent]); 
router.post('/home/cluster/deletegroup/:idclass',[session.check_loggedin,clustercontroller.deletegroup]); 
router.post('/home/cluster/deletestudent/:idstudent',[session.check_loggedin,clustercontroller.deletestudent]); 


// --------------------- ABS routes ---------------// 
router.get('/home/abs',[session.check_loggedin, abscontroller.viewabs]); 
router.post('/home/abs/logabs',[session.check_loggedin,abscontroller.createabs]);
router.post('/home/abs/displayabs',[session.check_loggedin,abscontroller.retrieveabs,abscontroller.display]); 








//////////////--------------------------- API Routes ----------------------------// 


var apiusercontroller = require('../controllers/apiusercontroller');
var apilessoncontroller =require('../controllers/apilessoncontroller');
var apiclustercontroller = require('../controllers/apiclustercontroller'); 
//var apiabscontroller =require('../controllers/apiabscontroller');
 

// ----------------------------------USER Routes--------------------// 
// for login & register
//router.get('/login',usercontroller.viewlogin); 
//router.get('/register', usercontroller.viewregister); 
router.post('/api/register', apiusercontroller.register); 
router.post('/api/auth',apiusercontroller.checklog); 
router.get('/api/logout',apiusercontroller.userlogout);

// for homepage
router.get('/api/home',session.apicheck_loggedin);

//------------------------- LESSON ROUTE -----------------------//
router.get('/api/home/lesson',apilessoncontroller.viewlesson);
router.post('/api/home/lesson/addlesson',apilessoncontroller.createlesson); 
router.delete('/api/home/lesson/deletelesson/:lessonid',apilessoncontroller.deletelesson); 
router.post('/api/home/lesson/alterlesson/:lessonid',apilessoncontroller.alterlesson); 
router.post('/api/home/lesson/updatelesson/:lessonid',apilessoncontroller.updatelesson) 


//---------------------- CLUSTER (GROUP & STUDENT) ROUTES ------------// 
router.get('/api/home/cluster',apiclustercontroller.viewcluster); 
router.post('/api/home/cluster/addgroup',apiclustercontroller.creategroup); 
router.post('/api/home/cluster/addstudent',apiclustercontroller.createstudent); 
router.delete('/api/home/cluster/deletegroup/:idclass',apiclustercontroller.deletegroup); 
router.delete('/api/home/cluster/deletestudent/:idstudent',apiclustercontroller.deletestudent); 


// --------------------- ABS routes ---------------// 
//NOT DONE 
//router.get('/home/abs',[session.check_loggedin, abscontroller.viewabs]); 
//router.post('/home/abs/logabs',[session.check_loggedin,abscontroller.createabs]);
//router.post('/home/abs/displayabs',[session.check_loggedin,abscontroller.retrieveabs,abscontroller.display]); 







////// exporting 


module.exports =router; 





