function botonGuardarClick() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let objContacto = {
        nombre: nombre, email: email, telefono: telefono
    };
    localStorage.setItem(nombre, JSON.stringify(objContacto));
    console.log(JSON.parse(localStorage.getItem(nombre)));
    pintarContacto(nombre, email, telefono);
}

function pintarContacto(nombre, email, telefono) {
    
    divExterior = document.createElement("DIV");
    document.getElementById("lista").appendChild(divExterior); // div es hijo de lista

    nodoLi = document.createElement("LI");
    nodoLi.addEventListener("click", liClick);
    textoNodo = document.createTextNode(nombre);
    nodoLi.appendChild(textoNodo);
    nodoSpan = document.createElement("SPAN");
    textoNodo = document.createTextNode(" " + email + " " + telefono);
    nodoSpan.appendChild(textoNodo);
    nodoLi.appendChild(nodoSpan);
    divExterior.appendChild(nodoLi); // li es hijo de div

    botonModificar = document.createElement("INPUT");
    botonModificar.setAttribute("type", "button");
    botonModificar.setAttribute("value", "Modificar");
    botonModificar.addEventListener("click", modificarClick);
    divExterior.appendChild(botonModificar); // botón modificar es hijo de div

    botonEliminar = document.createElement("INPUT");
    botonEliminar.setAttribute("type", "button");
    botonEliminar.setAttribute("value", "Eliminar");
    botonEliminar.addEventListener("click", eliminarClick);
    divExterior.appendChild(botonEliminar); // botón eliminar es hijo de div
}

function liClick() {
    arrayInfo = this.textContent.split(" ");
    informacion = document.getElementById("informacion");
    informacion.innerHTML = arrayInfo[0] + "<br>" + arrayInfo[1] + "<br>" + arrayInfo[2];
    informacion.style.visibility = 'visible';
}

function modificarClick() {
    var arrayInfoAntigua = this.previousSibling.textContent.split(" ");
    this.previousSibling.setAttribute("id", "modificando");
    document.getElementById("nombre").value = arrayInfoAntigua[0];
    document.getElementById("email").value = arrayInfoAntigua[1];
    document.getElementById("telefono").value = arrayInfoAntigua[2];
    botonGuardar = document.getElementById("guardar");
    botonGuardar.setAttribute("value", "Modificar");
    botonGuardar.removeEventListener("click", botonGuardarClick);
    botonGuardar.addEventListener("click", modificarContactoClick);
}

function eliminarClick() {
    document.getElementById("lista").removeChild(this.parentElement);
}

function modificarContactoClick() {
    arrayInfoNueva = [document.getElementById("nombre").value, document.getElementById("email").value,
    document.getElementById("telefono").value];
    infoAntigua = document.getElementById("modificando");
    infoAntigua.innerHTML = arrayInfoNueva[0] + " " + "<span>" + arrayInfoNueva[1] + " " + arrayInfoNueva[2] + "</span>";

    infoAntigua.setAttribute("id", "");
    this.setAttribute("value", "Guardar");
    this.removeEventListener("click", modificarContactoClick);
    this.addEventListener("click", botonGuardarClick);
}

function informacionClick() {
    this.style.visibility = 'hidden';
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("guardar").addEventListener("click", botonGuardarClick);
    document.getElementById("informacion").addEventListener("click", informacionClick);
    console.log(localStorage.length);
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
        let objContacto = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(objContacto);
    }
    /* pintarContacto(nombre, email, telefono); */
})