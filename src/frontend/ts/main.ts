declare const M;
var index_data = 0;
var id_Card;
//var instance = M.FormSelect.getInstance(elem);

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
                        
                        if (disp.id > index_data) 
                        {
                            index_data = disp.id;
                            console.log(index_data);
                        }
    

                        toaddhtml+=`<div class="col xs12 s12 m6 l4 xl3"> 
                                        <div class="card blue-grey darken-1" id="card${disp.id}" >
                                            <div class="card-content white-text">
                                                 <div align='center'>`
                        if (disp.type == 1) {
                            toaddhtml += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                        } else if (disp.type == 2) {
                            toaddhtml += `<img src="../static/images/window.png" alt="" class="circle">`;
                        } else  {
                            toaddhtml += `<img src="../static/images/others.png" alt="" class="circle">`;
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
                                                    
                                                    <button id="btn_del${disp.id}" class="btn waves-effect waves-light button-view btn red">del</button>
                                                    <button id="btn_mod${disp.id}" data-target="modal_Edit_Device" class="btn modal-trigger">edit</button>  
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
            if(response=="new_ok"){
                let cierre=this.framework.recuperarElemento("closeModalNew");
                cierre.click();
                location.reload();
            }
            else if(response=="mod_ok"){
                let cierre2=this.framework.recuperarElemento("closeModalEdit");
                cierre2.click();
                location.reload();
            }
            else if(response=="del_ok"){
                location.reload();
            }
            

        } else {
            alert("Error")    
        }
        
    }
    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
        
        //----------------- ACTAULIZAR SWITCH -----------------//

        if (e.type == "click" && objetoEvento.id.startsWith("cb_")) {

            console.log(objetoEvento.id,)
            console.log("Se hizo click para prender o apagar")
            let datos = { "id": objetoEvento.id.substring(3), "state": objetoEvento.checked };
            this.framework.ejecutarRequest("POST","http://localhost:8000/actualizar", this,datos)
        
        //----------------- CARGAR DATOS PARA MODIFICAR ELEMENTO -----------------//    
        
        }else if (e.type == "click" && ( objetoEvento.id.startsWith("btn_mod"))){
      
            console.log("Se hizo click en  " + objetoEvento.id,)
            //220819
            id_Card = objetoEvento.id.substring(7);//let nro_card = objetoEvento.id.substring(7);
            
            //let card =this.framework.recuperarElemento("card"+nro_card) as HTMLInputElement;
            let fld_mod_Name =this.framework.recuperarElemento("mod_Name") as HTMLInputElement;
            let fld_mod_Desc =this.framework.recuperarElemento("mod_Desc") as HTMLInputElement;
            let sel_mod_Estado =this.framework.recuperarElemento("inputType") as HTMLInputElement;
            let sel_mod_Tipo   =this.framework.recuperarElemento("inputType2") as HTMLInputElement;
            fld_mod_Name.value="Nombre Amigo";
            fld_mod_Desc.value="eh descripciòn ";
            
            //let nombrecard=card.textContent.substring(1,190);
            //console.log(nombrecard);

            console.log("lo que leo de id del Elemento es : " +objetoEvento.id.substring(7))
            alert("nada");

        //----------------- BORRAR ELEMENTO -----------------//                     
        
    } else if (e.type == "click" && ( objetoEvento.id.startsWith("btn_del"))){
      
            console.log("Se hizo click en  " + objetoEvento.id,)
           
            let datos=({ "id": objetoEvento.id.substring(7)})
            console.log("Se busca eliminar el registro - > " + objetoEvento.id.substring(7))
            this.framework.ejecutarRequest("POST","http://localhost:8000/eliminar", this,datos)

            //alert("Hola " +  this.listaPersonas[0].nombre +" ");    

        //----------------- NUEVO ELEMENTO -----------------// 
        } 
        else if(e.type == "click" && ( objetoEvento.id.startsWith("btnSalvarNew"))){
                console.log(objetoEvento.id,)
                let fld_new_Name =this.framework.recuperarElemento("new_Name") as HTMLInputElement;
                let fld_new_Desc =this.framework.recuperarElemento("new_Desc") as HTMLInputElement;

                let discreto =this.framework.recuperarElemento("new_discreto") as HTMLInputElement;
                let analogico =this.framework.recuperarElemento("new_analogico") as HTMLInputElement;

                let luces =this.framework.recuperarElemento("new_luces") as HTMLInputElement;
                let persiana =this.framework.recuperarElemento("new_persiana") as HTMLInputElement;
                let otros =this.framework.recuperarElemento("new_otros") as HTMLInputElement;


                let state = 0;
                let type = 0;


                if(discreto.checked== true){
                    state=1;} 
    
                if(analogico.checked == true){
                    state=2;} 

                if(luces.checked == true){
                    type=1;} 
    
                if(persiana.checked == true){
                    type=2;} 
    
                if(otros.checked == true){
                    type=3;} 

                if((fld_new_Name.value =='')||(fld_new_Desc.value =='')||(state ==0)||(type ==0))
                {
                    alert("No se almacenarán campos vacíos")
                }
                else 
                {  
                    let datos = { "id": index_data+1, "name": fld_new_Name.value, "description": fld_new_Desc.value, "state": state, "type": type };
                    console.log(datos)
                    this.framework.ejecutarRequest("POST","http://localhost:8000/nuevo", this,datos)
                }
                alert("para ver estado")
        //----------------- MODIFICAR ELEMENTO -----------------// 
        }
        else if(e.type == "click" && ( objetoEvento.id.startsWith("btnSalvarMod"))){
            console.log(objetoEvento.id,)
            let fld_mod_Name =this.framework.recuperarElemento("mod_Name")  as HTMLInputElement;
            let fld_mod_Desc =this.framework.recuperarElemento("mod_Desc") as HTMLInputElement;

            let discreto =this.framework.recuperarElemento("mod_discreto") as HTMLInputElement;
            let analogico =this.framework.recuperarElemento("mod_analogico") as HTMLInputElement;

            let luces =this.framework.recuperarElemento("mod_luces") as HTMLInputElement;
            let persiana =this.framework.recuperarElemento("mod_persiana") as HTMLInputElement;
            let otros =this.framework.recuperarElemento("mod_otros") as HTMLInputElement;
            
            let type=0;
            let state=0;

            if(discreto.checked== true){
                state=1;} 

            if(analogico.checked == true){
                state=2;} 

            if(luces.checked == true){
                type=1;} 

            if(persiana.checked == true){
                type=2;} 

            if(otros.checked == true){
                type=3;} 

            if((fld_mod_Name.value =='')||(fld_mod_Desc.value =='')||(state ==0)||(type ==0))
            {
                alert("No se modificarán campos vacíos")
            }
            else 
            {  
                let datos = { "id": id_Card, "name": fld_mod_Name.value, "description": fld_mod_Desc.value, "state": state, "type": type};
                console.log(datos)
                this.framework.ejecutarRequest("POST","http://localhost:8000/modificar", this,datos)
            }
            alert("para ver estado")
    }
    /*else if(e.type == "select" ){
        console.log("alerta por select " + objetoEvento.id,)
  
}*/
        
        
        
        /*else {
            
            let elemento = <HTMLInputElement>this.framework.recuperarElemento("input1");
            if (elemento.value.length>5) {
                
                
                M.toast({html: 'se cargo la info'})
            } else {
                alert("falta cargar el nombre o es menor a 5");    
            }

            
        }*/
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");
    M.updateTextFields();
    var elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1, "");
    let main: Main = new Main();
    main.nombre = "Matias"

    this.btnSalvarNew.addEventListener("click", main); //Se agega Listener para boton del modal de Agregar Dispositivo
    this.btnSalvarMod.addEventListener("click", main); //Se agega Listener para boton del modal de Modificar Dispositivo
    //this.sel_control.addEventListener("click", main); //Se agega Listener para boton del modal de Modificar Dispositivo
    //this.sel_dispositivo.addEventListener("click", main); //Se agega Listener para boton del modal de Modificar Dispositivo
    /*this.document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instance = M.FormSelect.init(elems, Option);
      });*/
});







