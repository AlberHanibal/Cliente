function botonGuardarClick() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let arrayContacto = JSON.parse(localStorage.getItem("contactos"));
    if (arrayContacto == null) {
        arrayContacto = [];
    }
    let objContacto = {
        nombre: nombre, email: email, telefono: telefono
    };
    arrayContacto.push(objContacto);
    localStorage.setItem("contactos", JSON.stringify(arrayContacto));
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
    arrayInfoAntigua = this.previousSibling.textContent.split(" ");
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
    // no esta el modificiar ni el borrado
    arrayInfoNueva = [document.getElementById("nombre").value, document.getElementById("email").value,
    document.getElementById("telefono").value];
    let arrayContacto = JSON.parse(localStorage.getItem("contactos"));
    console.log(arrayContacto[0].nombre);
    if (arrayContacto != null) { 
        i = 0;
        let encontrado = false;
        while (i < arrayContacto.length || encontrado) {
            if (arrayInfoAntigua[0] == arrayContacto[i].nombre) {
                arrayContacto[i].nombre = arrayInfoAntigua[0]
                arrayContacto[i].email = arrayInfoAntigua[1]
                arrayContacto[i].telefono = arrayInfoAntigua[2]
                encontrado = true;
            }
            i++;
        }
        localStorage.setItem("contactos", JSON.stringify(arrayContacto));
    }
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
    let arrayContacto = JSON.parse(localStorage.getItem("contactos"));
    console.log(arrayContacto);

    if (arrayContacto != null) {
        for (const contacto of arrayContacto) {
            pintarContacto(contacto.nombre, contacto.email, contacto.telefono);
        }
    }
    
})