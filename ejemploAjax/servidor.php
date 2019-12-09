<?php
$arrayNombre = [
    "Roberto",
    "Alberto",
    "María",
    "Santiago",
    "Godofredo",
    "Lucía",
    "Cristina"
];
$arrayApellido = [
    "Colmenar",
    "Gómez",
    "López",
    "Abascal",
    "Godofredo",
    "Casas"
];
$nombre = random_int(0, 6);
$apellido = random_int(0, 5);
echo "$arrayNombre[$nombre] $arrayApellido[$apellido]";
