var mysql = require('mysql'); 
var connectiondb = mysql.createConnection({
    host:'localhost', 
    user:'root',
    password:'hello',
    database:'schooldb',
    insecureAuth : true, 
    //multipleStatements: true if want multiple statement in sql 
}); 

connectiondb.connect(error=> {
    if (error) throw error;
    console.log('connected to the database schooldb'); 
}); 

module.exports = connectiondb; 