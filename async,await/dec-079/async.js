

let res

function add(x, y) {
    return x + y
}

res = add(5, 6)
console.log(res)




async function add_a(x, y) {
    return x + y
}

res = add_a(5, 6).then(function (resultado) {
    console.log(resultado)
})
// la promesa todavía no está resuelta. Se resuelve en el callback 
// del then()
console.log(res)



/*
    Explicamos ahora await. Creamos una función que retorne una promesa. Simplemente suma dos numeros pasados dos segundos
*/

function double_after2Seconds(x) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(x * 2);
        }, 2000);
    });
}

// probamos la función
double_after2Seconds(5).then(function (r) {
    console.log(r);
});



/*
    Ahora la queremos hacer funcionar en combinación con otras iguales a ellas para sumar algo mayor. Vemos que no funciona.

*/

let sum = double_after2Seconds(7)  // 14
    + double_after2Seconds(2)  // 4
    + double_after2Seconds(3)  // 6

console.log(sum); // debería ser 24 (14+4+6)


/*
    Podemos encadenar las promesas dentro de un método addPromise que haga la suma total:
*/

function add_doubles_promise() {
    return new Promise(function(resolve){
        double_after2Seconds(7).then(function(a){
            double_after2Seconds(2).then(function(b){
                double_after2Seconds(3).then(function(c){
                    resolve(a + b + c);
                })
            })
        })
    });
}


add_doubles_promise().then(function (sum) {
    console.log(sum)  // este si es 24 !!
})



/*
    Vamos a simplicar ahora todo esto con await y async
*/

async function add_doubles() {
    const a = await double_after2Seconds(7);
    const b = await double_after2Seconds(2);
    const c = await double_after2Seconds(3);
    return a + b + c;
}

add_doubles().then(function (sum) {
    console.log(sum)  // mucho mas sencillo que lo anterior
})

