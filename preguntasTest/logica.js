addEventListener("load", function () {
    document.getElementById("enviar").addEventListener("click", enviarTest);

});

function enviarTest() {
    var arrayRespuestas = [];
    var arrayInput = document.getElementsByTagName("input");
    for (const element of arrayInput) {
        if (element.checked) {
            let pregunta = element.getAttribute("name").replace("pregunta", "");
            var encontrado = false;
            var label = element.nextSibling.nextSibling;
            /* if (label.nodeName == "label") {
                encontrado = true;
            } */
            let respuesta = label.textContent;
            arrayRespuestas.push({pregunta, respuesta});
        }
    }

    let url = "servidor.php"
    let params = {
        method: 'post',
        body: JSON.stringify(arrayRespuestas)
    }
    fetch(url, params)
        .then(function (response) {
            return response.json();
        }).then(function (datos) {
            var numPregunta = 1;
            var nota = 0;
            // for de los checked, cambiar el estilo, mirar el div padre y meter la respuesta en un small
            for (let index = 0; index < arrayInput.length; index++) {
                if (arrayInput[index].checked) {
                    if (datos[numPregunta].correcta) {
                        nota++;
                        arrayInput[index].nextSibling.nextSibling.setAttribute("class", "bien");
                    } else {
                        arrayInput[index].nextSibling.nextSibling.setAttribute("class", "mal");
                    }
                    console.log(arrayInput[index]);
                    arrayInput[index].parentNode.parentNode.childNodes[1].innerHTML = datos[numPregunta].pregunta + "<br><small>" + datos[numPregunta].respuesta + "</small>";
                    numPregunta++;
                }
            }
            document.getElementById("nota").textContent = "Tu nota es " + nota;
        });
}