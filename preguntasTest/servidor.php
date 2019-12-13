<?php
require_once "test.php";
$pregunta1 = new PreguntaTest("1. Si ponemos un huevo en el microondas y ponemos el microondas a 1 minuto, ¿qué le pasaría al huevo?", "El huevo explota");
$arrayPreguntas["1"] = $pregunta1;
$pregunta2 = new PreguntaTest("2. ¿Qué es actualmente el conjunto monumental de SantaSofía de Estambul?", "Museo");
$arrayPreguntas["2"] = $pregunta2;
$pregunta3 = new PreguntaTest("3. ¿Qué especia es la semilla de un fruto?", "Nuez moscada");
$arrayPreguntas["3"] = $pregunta3;

$json = file_get_contents('php://input');
$respuestas = json_decode($json);

foreach ($respuestas as $respuesta) {
    $pregunta = $arrayPreguntas[$respuesta->pregunta];
    if ($pregunta->respuesta == $respuesta->respuesta) {
        $pregunta->nota = 1;
        $pregunta->correcta = true;
    } else {
        $pregunta->nota = 0;
        $pregunta->correcta = false;
    }
}

echo json_encode($arrayPreguntas);