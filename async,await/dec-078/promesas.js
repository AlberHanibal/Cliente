
/*
	Simulamos una encadenación de funciones asíncronas. Disparamos la acción invocando a crearArchivoAudioSync que recibe un array de configuración y dos callbacks para que se ejecuten al finalizar. 
 */


function exitoCallback(resultado) {
	console.log("Archivo de audio disponible en la URL " + resultado);
}

function falloCallback(error) {
	console.log("Error generando archivo de audio: " + error);
}

function crearArchivoAudioAsync_1(audioConfig, exito, fallo) {

	// valido que config está bien formado
	let configOk = audioConfig.length >= 3

	if (configOk) {
		// creo el fichero de configuración
		let fichero = "/tmp/ficheroConfig"
		exito(fichero)
	} else {
		fallo("config está mal formado")
	}
}


console.log(" *********************** con callbacks ********************")

let config1 = ["config", "bien", "formado"]

crearArchivoAudioAsync_1(config1, exitoCallback, falloCallback);



/*
	Hacemos ahora esto mismo usando una promesa.  Ahora la función crearArchivoAudioAsync crea en su interior una promesa, la implementa y la retorna. Una vez invocada esta función, seguidamente invocaremos al método then() de la promesa retornada y la insertaremos los callbacks de éxito o fracaso
 */

console.log(" *********************** con promesas ********************")

function crearArchivoAudioAsync_2(audioConfig) {

	let promesa = new Promise(function (exito, fallo) {
		let configOk = audioConfig.length >= 3
		if (configOk) {
			let fichero = "/tmp/ficheroConfig"
			exito(fichero)
		} else {
			fallo("config está mal formado")
		}
	})

	return promesa
}


let config2 = ["config", "bien","fichero"]

crearArchivoAudioAsync_2(config2).then(exitoCallback, falloCallback)
