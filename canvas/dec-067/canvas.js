
window.onload = init


// Variables.
var canvas, contexto, ancho_rectangulo, alto_rectangulo;



// Funcion que crea un circulo. 
function circle(x, y, r, color) {
    contexto.fillStyle = color;
    contexto.beginPath();
    contexto.arc(x, y, r, 0, Math.PI * 2, true);
    contexto.closePath();
    contexto.fill();
}



// Funcion que crea un rectangulo. 
function rect(x, y, w, h, color) {
    contexto.fillStyle = color;
    contexto.fillRect(x, y, w, h);
}


// Funcion que crea un objeto pelota

function pelota(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dx = 1;
    this.dy = 1.1;
    this.speed = 5;
    this.center = this.r / 2;


    this.move = function (direction) {
        if (this.x + this.center > ancho_rectangulo) {
            direction = "left"
        }

        if (this.x - this.center < 0) {
            direction = "right"
        }

        if (this.y + this.center > alto_rectangulo) {
            direction = "up"
        }

        if (this.y - this.center < 0) {
            direction = "down"
        }


        if (direction == "up") {
            this.y -= this.dy * this.speed;
        }
        if (direction == "down") {
            this.y += this.dy * this.speed;
        }
        if (direction == "left") {
            this.x -= this.dx * this.speed;
        }
        if (direction == "right") {
            this.x += this.dx * this.speed;
        }
    }

    this.draw = function () {
        circle(this.x, this.y, this.r, this.color);
    }
}


// Funcion que limpia los pasos de la pelota
function limpiar() {
    contexto.fillStyle = "grey";
    rect(0, 0, ancho_rectangulo, alto_rectangulo);
}


function mover(event) {
    limpiar()

    key = event.keyCode;
    switch (key) {
        case 40:
            pelota.move("down")
            break;
        case 38:
            pelota.move("up")
            break;
        case 39:
            pelota.move("right")
            break;
        case 37:
            pelota.move("left")
            break;
    }
    pelota.draw();
}



// Función para iniciar el programa
function init() {

    canvas = document.getElementById("micanvas");
    contexto = canvas.getContext("2d");
    ancho_rectangulo = canvas.width;
    alto_rectangulo = canvas.height;

    pelota = new pelota(50, 50, 10, "silver");
    //intervalId = setInterval(gameLoop, 1000/60);
    limpiar()
    window.addEventListener("keydown", mover)
}
