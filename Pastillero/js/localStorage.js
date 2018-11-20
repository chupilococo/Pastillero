// noinspection JSUnresolvedFunction
$(document).on( "pageinit", "#misRemedios", function() {
    console.log('cargo mis remedios');
    // console.log(JSON.parse(dc.loadRemedios()));
    dc.poblateMisRemedios(JSON.parse(dc.loadRemedios()));
});


document.addEventListener("DOMContentLoaded",function () {
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
    dc.poblateMisRemedios(JSON.parse(dc.loadRemedios()));
};


// dc.addRemedio({nombre:'hola',desc:'otra cosa'});
/**
 *
 * @param remedio
 * @returns {HTMLElement}
 */
dc.createItemList=function(remedio){

    let itemList= document.createElement("li");
        itemList.dataset['role']='collapsible';
        itemList.dataset['inset']='false';
    let h2=document.createElement('h2');
        // noinspection JSUnresolvedVariable
    h2.innerText=remedio.nombre;
    let div=document.createElement('div');
    let p=document.createElement('p');
        p.innerText=remedio.desc;
        div.appendChild(p);
        itemList.appendChild(h2);
        itemList.appendChild(div);
    return itemList;
};

/**
 *
 * @param remedios
 */
dc.poblateMisRemedios=function (remedios) {
    document.getElementById('misRemedios_lista').innerHTML='';
    for (let x in remedios) {
        // noinspection JSUnfilteredForInLoop
        let child=dc.createItemList(remedios[x]);
        $('#misRemedios_lista').append($(child).collapsible());
    };
    $('#misRemedios_lista').listview('refresh');
};