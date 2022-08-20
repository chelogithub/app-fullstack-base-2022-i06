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

//=======[ Main module code ]==================================================
app.post("/actualizar",function(req,res){
    console.log("Llegue al servidor")
    console.log(Object.keys(req.body).length)
    if(req.body.id!=undefined&& req.body.state!=undefined){
        console.log(req.body);
        if(req.body.state){
            data[data.findIndex(x => x.id==req.body.id)].state = 1;
        }else {
            data[data.findIndex(x => x.id==req.body.id)].state = 0;
              }
        console.log(data);
        res.send("actualizo");
    }else{
        res.send("ERROR");
    }
});

app.post("/nuevo",function(req,res){
    console.log("Llegue al servidor para agregar items nuevos")
    console.log(Object.keys(req.body).length)
    data.push(req.body);
    console.log(req.body);
    res.send("new_ok");
    });


app.post("/modificar",function(req,res){
    console.log("Llegue al servidor para modificar items")
    console.log(Object.keys(req.body).length)
    data[data.findIndex(x => x.id==req.body.id)].name = req.body.name;
    data[data.findIndex(x => x.id==req.body.id)].description = req.body.description;
    data[data.findIndex(x => x.id==req.body.id)].type = req.body.type;
    data[data.findIndex(x => x.id==req.body.id)].state = req.body.state;
    console.log(req.body);
    res.send("mod_ok");
    });

app.post("/eliminar",function(req,res){
    console.log("Llegue al servidor para eliminar items");
    console.log(Object.keys(req.body).length);
    console.log(req.body);
    data.splice(data.findIndex(x => x.id==req.body.id),1);

    console.log(data);
    res.send("del_ok");
    });

app.get('/devices/', function(req, res) {
   
    console.log("Alguien pidio divices!");
    setTimeout(function(){
    res.send(JSON.stringify(data)).status(200);      //Lo envío por texto plano
    }, 100);
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");            //Doy de alta la API
});

//=======[ End of file ]=======================================================
