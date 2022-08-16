//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'mysql-server',  //Si es local acá va localhost y se conecta la mySQL instalado en la maquina
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'  //nombre de la base de datos
});

//=======[ Main module code ]==================================================

connection.connect(function(err) {      //test de que me puedo conectar, devuelve un callback que es el function(err)
    if (err) {
        console.error('Error while connect to DB: ' + err.stack);
        return;
    }
    console.log('Connected to DB under thread ID: ' + connection.threadId);
});

module.exports = connection;        //exporta el módulo de codigo para que pueda ser utilizada en el mismo proyecto. Esto dsps nos permite ejecutar queries

//=======[ End of file ]=======================================================
