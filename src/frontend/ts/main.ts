declare const M;
var index_data = 0;     //Utilizado para la creación de nuevos elementos
var id_Card;            //Lectura del id de la card
class Main implements EventListenerObject, ResponseLister {
    public framework: FrameWork = new FrameWork();
    constructor() {
        
        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this)
        
    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let resputa: Array<Device> = JSON.parse(resputaString);
                        //-------------------------------------------------------------------------------//
                        //                              AGREGADO PARA CARDS 
                        //-------------------------------------------------------------------------------//     
                        let caja2Div    =   document.getElementById("caja2");
                        let toaddhtml:string =``;
                        /**** Se recorren todos lo elmentos del array para agregar los controles de cada uno ****/
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
            //-------------------------------------------------------------------------------//
            //                Agrego los eventLIstener de las cards creadas
            //-------------------------------------------------------------------------------//
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
    //-------------------------------------------------------------------------------//
    //Escucho la respuesta del BackEnd para recargar página luego de actualizar JSON
    //-------------------------------------------------------------------------------//
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
    // Recibo los eventos y los proceso
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
            id_Card = objetoEvento.id.substring(7);
            let fld_mod_Name =this.framework.recuperarElemento("mod_Name") as HTMLInputElement;
            let fld_mod_Desc =this.framework.recuperarElemento("mod_Desc") as HTMLInputElement;
            let sel_mod_Estado =this.framework.recuperarElemento("inputType") as HTMLInputElement;
            let sel_mod_Tipo   =this.framework.recuperarElemento("inputType2") as HTMLInputElement;
            console.log("lo que leo de id del Elemento es : " +objetoEvento.id.substring(7))
            //alert("nada");

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

                let off =this.framework.recuperarElemento("new_off") as HTMLInputElement;
                let on =this.framework.recuperarElemento("new_on") as HTMLInputElement;

                let luces =this.framework.recuperarElemento("new_luces") as HTMLInputElement;
                let persiana =this.framework.recuperarElemento("new_persiana") as HTMLInputElement;
                let otros =this.framework.recuperarElemento("new_otros") as HTMLInputElement;


                let state = 2;
                let type = 0;


                if(off.checked== true){
                    state=0;} 
    
                if(on.checked == true){
                    state=1;} 

                if(luces.checked == true){
                    type=1;} 
    
                if(persiana.checked == true){
                    type=2;} 
    
                if(otros.checked == true){
                    type=3;} 

                if((fld_new_Name.value =='')||(fld_new_Desc.value =='')||(state ==2)||(type ==0))
                {
                    alert("No se almacenarán campos vacíos")
                }
                else 
                {  
                    let datos = { "id": index_data+1, "name": fld_new_Name.value, "description": fld_new_Desc.value, "state": state, "type": type };
                    console.log(datos)
                    this.framework.ejecutarRequest("POST","http://localhost:8000/nuevo", this,datos)
                }
                //alert("para ver estado")
        //----------------- MODIFICAR ELEMENTO -----------------// 
        }
        else if(e.type == "click" && ( objetoEvento.id.startsWith("btnSalvarMod"))){
            console.log(objetoEvento.id,)
            let fld_mod_Name =this.framework.recuperarElemento("mod_Name")  as HTMLInputElement;
            let fld_mod_Desc =this.framework.recuperarElemento("mod_Desc") as HTMLInputElement;

            let off =this.framework.recuperarElemento("mod_off") as HTMLInputElement;
            let on =this.framework.recuperarElemento("mod_on") as HTMLInputElement;

            let luces =this.framework.recuperarElemento("mod_luces") as HTMLInputElement;
            let persiana =this.framework.recuperarElemento("mod_persiana") as HTMLInputElement;
            let otros =this.framework.recuperarElemento("mod_otros") as HTMLInputElement;
            
            let type=0;
            let state=2;

            if(off.checked== true){
                state=0;} 

            if(on.checked == true){
                state=1;} 

            if(luces.checked == true){
                type=1;} 

            if(persiana.checked == true){
                type=2;} 

            if(otros.checked == true){
                type=3;} 

            if((fld_mod_Name.value =='')||(fld_mod_Desc.value =='')||(state ==2)||(type ==0))
            {
                alert("No se modificarán campos vacíos")
            }
            else 
            {  
                let datos = { "id": id_Card, "name": fld_mod_Name.value, "description": fld_mod_Desc.value, "state": state, "type": type};
                console.log(datos)
                this.framework.ejecutarRequest("POST","http://localhost:8000/modificar", this,datos)
            }
            //alert("para ver estado")
    }
    }
}

//----------------- Agrego los eventListener al cargar la página -----------------//

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");
    M.updateTextFields();
    var elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1, "");
    let main: Main = new Main();

    this.btnSalvarNew.addEventListener("click", main); //Se agega Listener para boton del modal de Agregar Dispositivo
    this.btnSalvarMod.addEventListener("click", main); //Se agega Listener para boton del modal de Modificar Dispositivo
});







