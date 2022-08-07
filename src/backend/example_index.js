
/***********************************************************************************************************
 *              EJEMPLO DE EVENT EMITER
 */

// crea el objeto Evente Emitter
const eventEmitter = new EventSource.eventEmitter();

//crea funcion handler que se encarga de manejar el evento
const connectHandler = function connected(){
    console.log("conexion exitosa");
    eventEmitter.emit("data"); //Lanza el evento data que me lleva a la linea 14 (esto seria como un callback )
}

//Relaciono la aparicion del evento conexion con la fucnion connectHandler que me lleva a la linea 5
eventEmitter.on('conexion', connectHandler);


eventEmitter.on('data', function() {
    console.log("llego data");
});

//Se le puede asignar un funcion mas al mismo evento
eventEmitter.on('data', function() {
    console.log("llego data version 2");
});

//lanzo el evento conexion que me lleva a la linea 11
eventEmitter.emit('conexion');

/***********************************************************************************************************
 *              MODULE EXPORTS & REQUIERE
 */
//La ides es poder genera la importaciòn de librerias o codigo para reutilizar codigo
//  Ejempo momentjs ----> libreria para utilizar fechas, suma resta y bla bla bla
//
//  import ---> require
//  export ---> exportar
const persona= requiere('./example_datos.js');
/***********************************************************************************************************
 *              Framework Express
 */
// Usa JS con node JS para hacer una API 
// "npm init" nos genera el package.json, ahi dec"lara los pacquetes de terceros o librerìas de los que depende nuestra aplicación
// nos permita agregar paquetes como por ejemplo "npm install - save express"
// nos creala carpeta node_modules