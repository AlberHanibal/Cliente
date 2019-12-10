addEventListener("load", function () {
    var arrayBotones = document.getElementsByTagName("button");
    for (let boton of arrayBotones) {
        boton.addEventListener("click", peticionActualizar);
    }
    window.setInterval(function () {
        for (let boton of arrayBotones) {
            boton.click();
        }
    }, 5000);
});

function peticionActualizar() {
    let linea = this.parentNode.parentNode;
    let hijosLinea = linea.childNodes;
    let contadorTd = 0;
    for (const elemento of hijosLinea) {
        if (elemento.nodeName == "TD") {
            if (contadorTd == 0) {
                var campoVMax = elemento;
            } else if (contadorTd == 1) {
                var campoVMin = elemento;
            } else if (contadorTd == 2) {
                var campoInc = elemento;
            } else if (contadorTd == 3) {
                var campoVActual = elemento;
            }
            contadorTd++;
        }
    }
    fetch("servidor.php")
        .then(function (respuesta) {
            return respuesta.text();
        })
        .then(function (inc) {
            inc = parseInt(inc);
            campoInc.textContent = inc + " €";
            if (inc >= 0) {
                campoInc.textContent = "+" + campoInc.textContent;
            }
            let vActual = parseInt(campoVActual.textContent.split(" ")[0]);
            vActual = vActual + inc;
            campoVActual.textContent = vActual + " €";
            let vMax = parseInt(campoVMax.textContent.split(" ")[0]);
            if (vActual > vMax) {
                campoVMax.textContent = vActual + " €";
            }
            let vMin = parseInt(campoVMin.textContent.split(" ")[0]);
            if (vActual < vMin) {
                campoVMin.textContent = vActual + " €";
            }
        });

}
