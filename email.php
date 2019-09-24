<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$result = Array();

$to      = "0013zkr@gmail.com";
$subject = "Solicitud Franquiciatario";
$message = "
            <html>
            <head>
            <title>Solicitud Franquiciatario</title>
            </head>
            <body>
            <div style='background:#eee;display:block;padding:15px;border:2px solid #ccc;margin:15px;font-family:Segoe UI;max-width:600px'>
            <h1 style='background:#fff;color:#333;padding:15px;border-radius:3px;margin:0;border-bottom:5px solid #ccc'>Solicitud Franquiciatario</h1>
            <div style='background:#fff;padding:15px'>
            <p><b>caption</b> $_POST[caption]</p>
            <p><b>ciudad</b> $_POST[ciudad]</p>
            <p><b>copy</b> $_POST[copy]</p>
            <p><b>duracion</b> $_POST[duracion]</p>
            <p><b>email</b> $_POST[email]</p>
            <p><b>estado</b> $_POST[estado]</p>
            <p><b>formatoDigital</b> $_POST[formatoDigital]</p>
            <p><b>formatoImpreso</b> $_POST[formatoImpreso]</p>
            <p><b>grupo</b> $_POST[grupo]</p>
            <p><b>legales</b> $_POST[legales]</p>
            <p><b>medida</b> $_POST[medida]</p>
            <p><b>otrosFormatos</b> $_POST[otrosFormatos]</p>
            <p><b>pauta</b> $_POST[pauta]</p>
            <p><b>promocion_solicitud</b> $_POST[promocion_solicitud]</p>
            <p><b>sucursal</b> $_POST[sucursal]</p>
            <hr>
            <p><a href='http://cgomez.work/solicitud/autorizar.php?idSolicitud=$_POST[idSolicitud]'>Autorizar</a></p>      
            </div>
            </div>
            </body>
            </html>
            ";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: cesar@cgomez.work' . "\r\n";
$headers .= 'Bcc: mgomez@onecard.mx' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    $result["Success"] = true;
} else {
    $result["Success"] = false;
}

echo json_encode($result);

?>
