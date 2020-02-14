var rectangulos = [];
var anchoRectangulos = 20;
var altoRectangulos = 20;
var velocidadRectangulos = 6;
var tiempoCreacionRectangulos = 500;
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
    }, tiempoCreacionRectangulos);
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
            if (colision(rectangulos[i])) {
                rectangulos.splice(i, i + 1);
            }
            rectangulos[i].dibujar(contexto);
        }
    }, 60)
}

function colision(rect) {
    let trianguloV1X = triangulo.verticeSupX - triangulo.lado / 2;
    let trianguloV1Y = triangulo.verticeSupY + triangulo.alto;
    let trianguloV2X = triangulo.verticeSupX + triangulo.lado / 2;
    let trianguloV2Y = triangulo.verticeSupY + triangulo.alto;
    if (intersects(triangulo.verticeSupX, triangulo.verticeSupY, trianguloV1X, trianguloV1Y
        , rect.x, rect.y + rect.alto, rect.x + rect.ancho, rect.y + rect.alto)) {
        return true;
    }
    if (intersects(triangulo.verticeSupX, triangulo.verticeSupY, trianguloV2X, trianguloV2Y
        , rect.x, rect.y + rect.alto, rect.x + rect.ancho, rect.y + rect.alto)) {
        return true;
    }
    return false;
}

function moverTriangulo(event) {
    if (event.keyCode == 37) {
        triangulo.mover(velocidadTriangulo, "izq");
    } else if (event.keyCode == 39) {
        triangulo.mover(velocidadTriangulo, "dcha");
    }
}

function intersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

function inicializar() {
    canvas = document.getElementById("micanvas");
    contexto = canvas.getContext("2d");
    ancho_rectangulo = canvas.width;
    alto_rectangulo = canvas.height;
    triangulo = new Triangulo(ladoTriangulo, ancho_rectangulo / 2, alto_rectangulo - ladoTriangulo * 2, "blue");
    addEventListener("keydown", moverTriangulo);
    animacion();

}