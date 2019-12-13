<?php
class PreguntaTest {
    public $pregunta;
    public $respuesta;
    public $nota;
    public $correcta;

    public function __construct($pregunta, $respuesta) {
        $this->pregunta = $pregunta;
        $this->respuesta = $respuesta;
    }
}