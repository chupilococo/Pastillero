// noinspection JSUnresolvedFunction
$(document).on( "pageinit", "#misRemedios", function() {
    console.log('cargo mis remedios');
    // console.log(JSON.parse(dc.loadRemedios()));
    dc.poblateMisRemedios(JSON.parse(dc.loadRemedios()));
});


document.addEventListener("DOMContentLoaded",function () {
    document.getElementById('formAdd').addEventListener('submit',function (e) {
        e.preventDefault();
        let desc    =$('#formDesc')[0];
        let nombre  =$('#formNombre')[0];
        dc.addRemedio({nombre: nombre.value,desc:desc.value});
            desc.value='';
            nombre.value='';
        $.mobile.changePage('#misRemedios')
    });

    if (localStorage){
    }else{
       console.log("local storage no disponible");
    }
});

let dc={};
/**
 *
 * @returns {string}
 */
dc.loadRemedios=function () {
    return localStorage.getItem('remedios');
};

/**
 *
 * @param remedio
 */
dc.addRemedio=function (remedio) {
    if (!localStorage.getItem('remedios')){
        let remedios=[];
        remedios.push(remedio);
        console.log(remedios);
        localStorage.setItem('remedios',JSON.stringify(remedios));
    }else {
        let remedios = JSON.parse(localStorage.getItem('remedios'));
        console.log(remedios);
        remedios.push(remedio);
        localStorage.setItem('remedios', JSON.stringify(remedios));
    }
    // dc.poblateMisRemedios(JSON.parse(dc.loadRemedios()));
};


// dc.addRemedio({nombre:'hola',desc:'otra cosa'});
/**
 *
 * @param remedio
 * @param id
 * @returns {HTMLElement}
 */
dc.createItemList=function(remedio, id){

    let itemList= document.createElement("li");
        itemList.dataset['role']='collapsible';
        itemList.dataset['inset']='false';
        itemList.dataset['id']=id;
    let h2=document.createElement('h2');
        // noinspection JSUnresolvedVariable
        h2.innerText=remedio.nombre;
    let div=document.createElement('div');
    let p=document.createElement('p');
        p.innerText=remedio.desc;
        div.appendChild(p);
    let btn=document.createElement("button");
        btn.innerText='borrar';
        btn.addEventListener('click',function () {
           dc.removeRemedio(
               this.parentElement.parentElement.dataset['id']
           );
        });
        itemList.appendChild(h2);
        itemList.appendChild(div);
        itemList.appendChild(btn);
    return itemList;
};


dc.removeRemedio=function(id){
    let remedios=JSON.parse(dc.loadRemedios());
        remedios.splice(id,1);
        console.log(remedios);
        localStorage.setItem('remedios', JSON.stringify(remedios));
        dc.poblateMisRemedios(JSON.parse(dc.loadRemedios()));
};





/**
 *
 * @param remedios
 */
dc.poblateMisRemedios=function (remedios) {
    let misRemediosLista=$('#misRemedios_lista');
        misRemediosLista[0].innerHTML='';
    for (let x in remedios) {
        // noinspection JSUnfilteredForInLoop
        let child=dc.createItemList(remedios[x], x);
        misRemediosLista.append($(child).collapsible());
    }
    misRemediosLista.listview('refresh');
};

