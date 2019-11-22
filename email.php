<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$result = Array();

$to      = "0013zkr@gmail.com";
$subject = "☝ Nueva Solicitud [ID $_POST[idSolicitud]]";
$message = "
            <html>
            <head>
            <title>Solicitud Franquiciatario</title>
            </head>
            <body>
            <div style='background:#eee;display:block;padding:15px;border:2px solid #ccc;margin:15px;font-family:Segoe UI;max-width:600px'>            
            <h1 style='background:#fff;color:#333;padding:15px;border-radius:3px;margin:0;border-bottom:5px solid #ccc'>$_POST[grupo] $_POST[sucursal]</h1>
            <div style='background:#fff;padding:15px'>
            <p><b>Grupo Franquiciatario</b> $_POST[grupo]</p>
            <p><b>Estado</b> $_POST[estado]</p>
            <p><b>Ciudad</b> $_POST[ciudad]</p>
            <p><b>Sucursal</b> $_POST[sucursal]</p>
            <hr>
            <p><b>Formato Impreso</b> $_POST[formatoImpreso]</p>
            <p><b>Formato Digital</b> $_POST[formatoDigital]</p>
            <p><b>Otros formatos</b> $_POST[otrosFormatos]</p>
            <hr>
            <p><b>Promoción / solicitud específica</b> $_POST[promocion_solicitud]</p>
            <p><b>Medida</b> $_POST[medida]</p>
            <p><b>Duracion</b> $_POST[duracion]</p>
            <p><b>Legales</b> $_POST[legales]</p>
            <hr>
            <p><b>caption</b> $_POST[caption]</p>
            <p><b>copy</b> $_POST[copy]</p>
            <p><b>pauta</b> $_POST[pauta]</p>
            <hr>
            <p><b>Nombre Completo</b> $_POST[nombre]</p>
            <p><b>Correo Electronico</b> $_POST[email]</p>
            <hr>
            <div style='padding:20px;margin:15px 5px;text-align:center'>
            <a href='http://cgomez.work/solicitud/autorizar.php?idSolicitud=$_POST[idSolicitud]' style='background:#28a745, border:2px solid #28a745;color:#fff'>Ver Detalle</a>
            </div>      
            </div>
            </div>
            </body>
            </html>
            ";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$header = "From: $noreply@intaxfin.com\nMIME-Version: 1.0\nContent-Type: text/html; charset=utf-8\n";
$headers .= 'From: cesar@cgomez.work' . "\r\n";
//$headers .= 'Bcc: mgomez@onecard.mx' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    $result["Success"] = true;
} else {
    $result["Success"] = false;
}

echo json_encode($result);

?>
