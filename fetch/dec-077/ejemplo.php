<?php
$json = file_get_contents('php://input');

$data = json_decode($json);

$data->nombre=strtoupper($data->nombre);
$data->apellidos=strtoupper($data->apellidos);

echo json_encode($data);
?>