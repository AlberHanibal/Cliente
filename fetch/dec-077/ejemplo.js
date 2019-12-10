
addEventListener("load", function () {
    let boton = document.getElementById("procesar")
    boton.addEventListener("click", procesar)
})


function procesar() {
    let n = document.getElementById("nombre").value
    let a = document.getElementById("apellidos").value
    let url = "ejemplo.php"
    let params = {
        method: 'post',
        body: JSON.stringify({nombre:n, apellidos:a})
    }
    fetch(url, params)
        .then(function (response) {
            return response.json()
        }).then(function (datos) {
            respuesta.innerHTML = "Recibimos: "+datos.nombre+"  "+datos.apellidos
        })
}

