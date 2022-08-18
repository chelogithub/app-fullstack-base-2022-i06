//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

var  devices = [
    { 
        'id': 1, 
        'name': 'Lampara 1', 
        'description': 'Luz living', 
        'state': 1, 
        'type': 1, 
    },
    { 
        'id': 2, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 0, 
        'type': 2, 
    },
    { 
        'id': 3, 
        'name': 'Lampara 2', 
        'description': 'Luz de la entrada', 
        'state': 1, 
        'type': 1, 
    },
    { 
        'id': 4, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 1, 
        'type': 2, 
    },
    { 
        'id': 5, 
        'name': 'Lampara 1', 
        'description': 'Luz living', 
        'state': 1, 
        'type': 1, 
    },
    { 
        'id': 6, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 0, 
        'type': 2, 
    },
    { 
        'id': 7, 
        'name': 'Lampara 2', 
        'description': 'Luz de la entrada', 
        'state': 1, 
        'type': 1, 
    },
    { 
        'id': 8, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 0, 
        'type': 2, 
    },
];
//=======[ Main module code ]==================================================
app.post("/actualizar",function(req,res){
    console.log("Llegue al servidor")
    console.log(Object.keys(req.body).length)
    if(req.body.id!=undefined&& req.body.state!=undefined){
        console.log(req.body);
        res.send("actualizo");
    }else{
        res.send("ERROR");
    }

   
});
app.get('/devices/', function(req, res) {
   
    console.log("Alguien pidio divices!");
    setTimeout(function(){
        res.send(JSON.stringify(devices)).status(200);      //Lo envío por texto plano
    }, 200);
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");            //Doy de alta la API
});

//=======[ End of file ]=======================================================
