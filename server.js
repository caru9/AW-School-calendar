var express = require('express');
let app = express(); 
let router = require('./routes/routes');
var session = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// static ressources 
app.use(express.static('public'));  // to use static ressources from public folder

app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false,
}));

app.all('/*', function(req, res, next) {
    //CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept,X-Access-Token,X-Key');
    if(req.method== 'OPTIONS') {res.status(200).end();
    }
    else { next();}
});


app.use('/', router);






var port= 8000; 
app.listen(port, function() {console.log('Running server on port' + port); })