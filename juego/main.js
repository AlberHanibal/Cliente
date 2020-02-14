var rectangulos = [];
var anchoRectangulos = 20;
var altoRectangulos = 20;
var velocidadRectangulos = 6;
var ladoTriangulo = 20;
var velocidadTriangulo = 10;
var puntuacion = 0;

addEventListener("load", inicializar);

class Rectangulo {
    constructor(x, y, ancho, alto, color) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.color = color
    }

    dibujar(contexto) {
        contexto.fillStyle = this.color;
        contexto.fillRect(this.x, this.y, this.ancho, this.alto);
    }

    mover(velocidad) {
        this.y = this.y + velocidad;
    }
}

class Triangulo {
    constructor(lado, verticeSupX, verticeSupY, color) {
        this.lado = lado;
        this.alto = lado * (Math.sqrt(3) / 2);
        this.verticeSupX = verticeSupX;
        this.verticeSupY = verticeSupY;
        this.color = color;
    }

    dibujar(contexto) {
        contexto.fillStyle = this.color;
        contexto.beginPath();
        contexto.moveTo(this.verticeSupX, this.verticeSupY);
        contexto.lineTo(this.verticeSupX + (this.lado / 2), this.verticeSupY + this.alto);
        contexto.lineTo(this.verticeSupX - (this.lado / 2), this.verticeSupY + this.alto);
        contexto.lineTo(this.verticeSupX, this.verticeSupY);
        contexto.fill();
        contexto.closePath();
    }

    mover(velocidad, direccion) {
        if (direccion == "izq" && this.verticeSupX - velocidad > 0) {
            this.verticeSupX = this.verticeSupX - velocidad;
        } else if (direccion == "dcha" && this.verticeSupX + velocidad < ancho_rectangulo) {
            this.verticeSupX = this.verticeSupX + velocidad;
        }
    }
}

function limpiar() {
    contexto.fillStyle = "lightblue";
    contexto.fillRect(0, 0, ancho_rectangulo, alto_rectangulo);
}

function animacion() {
    setInterval(function () {
        let x = (Math.random() * ancho_rectangulo) + 1;
        let r = new Rectangulo(x, 0, anchoRectangulos, altoRectangulos, "black");
        rectangulos.push(r);
    }, 500);
    setInterval(function () {
        limpiar();
        triangulo.dibujar(contexto);
        triangulo.mover(contexto);
        for (let i = 0; i < rectangulos.length; i++) {
            rectangulos[i].mover(velocidadRectangulos);
            if (rectangulos[i].y > alto_rectangulo + altoRectangulos) {
                rectangulos.splice(i, i + 1);
                puntuacion++;
            }
            rectangulos[i].dibujar(contexto);
        }
    }, 60)
}

function moverTriangulo(event) {
    if (event.keyCode == 37) {
        triangulo.mover(velocidadTriangulo, "izq");
    } else if (event.keyCode == 39) {
        triangulo.mover(velocidadTriangulo, "dcha");
    }
    
}

function inicializar() {
    canvas = document.getElementById("micanvas");
    contexto = canvas.getContext("2d");
    ancho_rectangulo = canvas.width;
    alto_rectangulo = canvas.height;
    triangulo = new Triangulo(ladoTriangulo, ancho_rectangulo / 2, alto_rectangulo - ladoTriangulo * 2, "blue");
    addEventListener("keydown", moverTriangulo);
    animacion();

}