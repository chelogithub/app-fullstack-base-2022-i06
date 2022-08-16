//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
var data    = require('./datos.json');

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
        'state': 1, 
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
        //res.send(JSON.stringify(devices)).status(200);
        res.send(JSON.stringify(data)).status(200);
    }, 2000);
    
});

app.get('/devid/', function(req, res) {
   
    console.log("Punto (3) Envìo de JSON a endpoint /dispositivos !");
    setTimeout(function(){
        //res.send(JSON.stringify(data)).status(200);
        res.json(datos);
    }, 2000);
    
});

app.get('/devid/:id', function(req,res){  //EN el callback tenemos el objeto request y response, req: datos de conexion res: datos que envío (res.send o res.json)
    //let id_num=req.params.id;
    //console.log(id_num);
    //res.json(data[req.params.id]);
    //Primer ejemplo
    let datoFiltrado = datos.filter((item)=>item.id===req.params.id);
    
    
    
    let device = data.find(x => x.id == req.params.id);
    res.json(device); // Solo mando JSON
    
    console.log("Punto (4) - Devolución de JSON por envío de parámetro");
});

app.post('/devid2/:id', function(req,res){
    console.log(re.params.id + req.params.state);
    console.log("Punto(5)");
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
    console.log("Punto (2) El nombre del item 2 es " + data[2].name + " por lo tanto funciona la lectura del archivo json a una variable");
});

//=======[ End of file ]=======================================================
