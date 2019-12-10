
addEventListener("load", function () {
    let boton = document.getElementById("comprobar")
    boton.addEventListener("click", comprobar)
})


function comprobar() {
    let respuesta = document.getElementById("disponibilidad")
    fetch("ejemplo.php")
        .then(function (response) {
            return response.text()
        }).then(function (texto) {
            console.log(texto)
            if (texto == "si") {
                respuesta.innerHTML="El nombre <b>si</b> está disponible"
            } else {
                respuesta.innerHTML="El nombre <b>no</b> está disponible"
            }
        })
}

