
var peticion_http = null

function comprobar() {

    if (window.XMLHttpRequest) {
        peticion_http = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        peticion_http = ActiveXObject("Microsoft.XMLHTTP");
    }

    var login = document.getElementById("login").value;

    if (peticion_http) {
        peticion_http.onreadystatechange = procesaRespuesta;
        peticion_http.open("POST", "ejemplo.php");

        //Meto cabeceras y cuerpo de la petición para enviar los datos del formulario 
        // que me interesa enviar. En este caso solo el login

        peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http.send("login=" + login);
    }
}

function procesaRespuesta() {
    if (peticion_http.readyState == 4) {
        if (peticion_http.status == 200) {
            if (peticion_http.responseText == "si") {
                document.getElementById("disponibilidad").innerHTML = "Nombre de usuario disponible";
            } else {
                document.getElementById("disponibilidad").innerHTML = "Nombre de usuario <b>no</b> disponible";
            }
        }
    }
}

window.onload = function () {
    document.getElementById("comprobar").onclick = comprobar;
}

