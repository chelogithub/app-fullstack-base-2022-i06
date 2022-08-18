declare const M;
class Main implements EventListenerObject, ResponseLister {
    public listaPersonas: Array<Persona> = new Array();
    public etidadesAcciones: Array<Acciones> = new Array();
    public nombre: string;
    public framework: FrameWork = new FrameWork();
    constructor() {
        
        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this)
 
        this.listaPersonas.push(new Usuario("Juan", 12, "jPerez"));
        this.listaPersonas.push(new Administrador("Pedro", 35));
        this.listaPersonas.push(new Persona("S", 12));
        this.etidadesAcciones.push(new Usuario("Juan", 12, "jPerez"));
        this.etidadesAcciones.push(new Administrador("Juan", 12));

        
    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let resputa: Array<Device> = JSON.parse(resputaString);

                        //******************** AGREGADO PARA CARDS *********************//

                        let caja2Div    =   document.getElementById("caja2");
                        let toaddhtml:string =``;
                        for (let disp of resputa) {
                        toaddhtml+=`<div class="col xs12 s12 m6 l4 xl3"> 
                                        <div class="card blue-grey darken-1" id="card${disp.id}" >
                                            <div class="card-content white-text">
                                                 <div align='center'>`
                        if (disp.type == 1) {
                            toaddhtml += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                        } else if (disp.type == 2) {
                            toaddhtml += `<img src="../static/images/window.png" alt="" class="circle">`;
                        }
                        toaddhtml += `  
                                        <span class="card-title"><b>${disp.name}</b></span>
                                        <p><i>${disp.description}</i></p>
                                       
                                        <br>
                                                <div class="switch">
                                                    <label>
                                                    Off
                                                    <input `
                                                    if (disp.state) {
                                                        toaddhtml += `checked`;
                                                         }
                                                    
                                                    toaddhtml += `
                                                    type="checkbox" id="cb_${disp.id}">
                                                    <span class="lever"></span>
                                                    On
                                                    </label>
                                                </div>

                                                
                                        <br>
                                                    
                                                    <button id="btn_del${disp.id}" class="btn waves-effect waves-light button-view btn-small red"><i class="material-icons center">delete</i></button>
                                                    <button id="btn_mod${disp.id}" data-target="modal_Edit_Device" class="btn modal-trigger">editar</button>  
                                                    </div>
                                            </div>
                                        </div>
                                    </div>`;
                                                }

                      caja2Div.innerHTML = toaddhtml;
                        //class="btn waves-effect waves-light button-view btn-small green"><i class="material-icons center">create</i></button>
                        //******************** AGREGADO PARA CARDS *********************//



            //let resputaString: string = response;
            //let resputa: Array<Device> = JSON.parse(resputaString);
           /* let cajaDiv = document.getElementById("caja");

            cajaDiv.setAttribute("class", "talcoa");
            cajaDiv.setAttribute("id", "otro");
            cajaDiv.setAttribute("miAtt", "123");
            let valor= cajaDiv.getAttribute("miAtt");
            let datosVisuale:string = `<ul class="collection">`
            for (let disp of resputa) {
                datosVisuale += ` <li class="collection-item avatar">`;
                if (disp.type == 1) {
                    datosVisuale += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                } else if (disp.type == 2) {
                    datosVisuale += `<img src="../static/images/window.png" alt="" class="circle">`;
                }
                
                datosVisuale += `<span class="title nombreDisp">${disp.name}</span>
                <p>${disp.description}
                </p>

                <a href="#!" class="secondary-content">
                <div class="switch">
                <label>
                  Off
                  <input type="checkbox" id="cbd_${disp.id}">
                  <span class="lever"></span>
                  On
                </label>
              </div>
                </a>
              </li>`
            }
            datosVisuale += `</ul>`
            

            cajaDiv.innerHTML = datosVisuale; */

            //    Agrego los eventLIstener a los elementos que quiero escuchar  

            for (let disp of resputa) {
                let checkbox = document.getElementById("cb_" + disp.id);
                checkbox.addEventListener("click",this);
                let btnEliminar = document.getElementById("btn_del" + disp.id);
                btnEliminar.addEventListener("click",this);
                let btnModificar = document.getElementById("btn_mod" + disp.id);
                btnModificar.addEventListener("click",this);
            }
        
          } else {
              alert("Algo salio mal")
          }
    }
    handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            alert("Se acutlizo correctamente")    
        } else {
            alert("Error")    
        }
        
    }
    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
      
        if (e.type == "click" && objetoEvento.id.startsWith("cb_")) {

            console.log(objetoEvento.id,)
            console.log("Se hizo click para prender o apagar")
            let datos = { "id": objetoEvento.id.substring(3), "state": objetoEvento.checked };
            this.framework.ejecutarRequest("POST","http://localhost:8000/actualizar", this,datos)
            
        }else if (e.type == "click" && ( objetoEvento.id.startsWith("btn"))){
      
            console.log("Se hizo click en  " + objetoEvento.id,)
            //alert("Hola " +  this.listaPersonas[0].nombre +" ");    
        } 
        else if (e.type == "click" ) {
      
            
        alert("Hola " +  this.listaPersonas[0].nombre +" ");    
        }else {
            
            let elemento = <HTMLInputElement>this.framework.recuperarElemento("input1");
            if (elemento.value.length>5) {
                
                
                M.toast({html: 'se cargo la info'})
            } else {
                alert("falta cargar el nombre o es menor a 5");    
            }

            
        }
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");
    M.updateTextFields();
    var elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1, "");
    //let btn = document.getElementById("btnSaludar");
    //let btn2 = document.getElementById("btnDoble");
    let main: Main = new Main();
    main.nombre = "Matias"

    //btn2.addEventListener("dblclick", main);
    //btn.addEventListener("click", main);
    this.btnSalvarNew.addEventListener("click", main); //Se agega Listener para boton del modal de Agregar Dispositivo
    this.btnSalvarMod.addEventListener("click", main); //Se agega Listener para boton del modal de Modificar Dispositivo
});







