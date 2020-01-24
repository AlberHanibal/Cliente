class Punto {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Cuadrado {

    constructor(pa, pb) {
        this.pa = pa;
        this.pb = pb;
    }

    alto() {
        return Math.abs(this.pa.y - this.pb.y);
    }

    ancho() {
        return Math.abs(this.pa.x - this.pb.x);
    }

    perimetro() {
        return this.ancho() * 2 + this.alto() * 2;
    }

    area() {
        return this.ancho() * this.alto();
    }
}
function crearCuadrado(x1, x2, y1, y2) {
    return new Cuadrado((new Punto(x1, y1)), (new Punto(x2, y2)));
}

function cuadradoMasAlto(cuadrados) {
    let cuadradoMasAlto = crearCuadrado(0, 0, 0, 0);
    for (const cuadrado of cuadrados) {
        if (cuadrado.alto() >= cuadradoMasAlto.alto()) {
            cuadradoMasAlto = cuadrado;
        }
    }
    return cuadradoMasAlto;
}
function cuadradoMasAncho(cuadrados) {
    let cuadradoMasAncho = crearCuadrado(0, 0, 0, 0);
    for (const cuadrado of cuadrados) {
        if (cuadrado.ancho() >= cuadradoMasAncho.ancho()) {
            cuadradoMasAncho = cuadrado;
        }
    }
    return cuadradoMasAncho;
}
addEventListener("load", function () {

    var cuadrados = [
        crearCuadrado(1, 10, 3, 4),
        crearCuadrado(1, 3, 1, 50),
        crearCuadrado(1, 6, 3, 10),
        crearCuadrado(2, 6, 10, 20),
        crearCuadrado(6, 8, 1, 4),
        crearCuadrado(1, 7, 21, 30)
    ];
    
    for (const cuadrado of cuadrados) {
        console.log("Ancho:");
        console.log(cuadrado.ancho());
        console.log("Altura:");
        console.log(cuadrado.alto());
        console.log("**********");
        console.log(cuadrado.perimetro());
        console.log("**********");
        console.log(cuadrado);
        console.log("**********");
    }
    console.log("Más alto");
    console.log(cuadradoMasAlto(cuadrados));
    console.log("Más ancho");
    console.log(cuadradoMasAncho(cuadrados));

});