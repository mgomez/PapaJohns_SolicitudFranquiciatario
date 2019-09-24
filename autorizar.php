<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_name("Papa-Johns-Franquiciatario");
session_start();

$estaAutenticado = false;
$idSolicitud = $_GET["idSolicitud"];
//valido que venga el ID de la orden
if(empty($idSolicitud)){
  exit("Petición Incorrecta.");
}
//primero valido si viene de hacer el login
if(empty($_POST)){  
  if(isset($_SESSION["usuario"])){
    $estaAutenticado = true;
  }
}else{  
  if(($_POST["usuario"] == "Admin") && ($_POST["password"] == "Admin1!")){     
    $_SESSION['usuario'] = $_POST["usuario"];
    header("Location: autorizar.php?idSolicitud=".$idSolicitud);
  }else{
    exit("Intenta nuevamente....");
  }  
}
?>
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>Solicitud Franquiciatario</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <meta name="msapplication-TileColor" content="#b91d47">
  <meta name="theme-color" content="#ffffff">
  <!-- Place favicon.ico in the root directory -->
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/bootstrap.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.5.0/css/bootstrap4-toggle.min.css" rel="stylesheet">
  <script>
    var estaAutenticado = "<?=$estaAutenticado?>";
    var idSolicitud ="<?=$idSolicitud?>";
  </script>
</head>

<body>
  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-firestore.js"></script>
  <script>
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDxSwMZfx-3RCD3slUYNcV-T0-jqpY5gJ8",
    authDomain: "integrador-f9629.firebaseapp.com",
    databaseURL: "https://integrador-f9629.firebaseio.com",
    projectId: "integrador-f9629",
    storageBucket: "integrador-f9629.appspot.com",
    messagingSenderId: "250744788489",
    appId: "1:250744788489:web:6b220c3c3e80b334f4cad8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();
</script>
  <div id="loading"></div>
  <div id="page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <div class="p-4 m-4 text-center">
                <img src="img/logo.svg" alt="logo" class="img-fluid mb-4 flip-in-ver-right">
                <h2 class="title">Solicitud Franquiciatario</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <?php if($estaAutenticado):?>
          <div class="card">
            <div id="frmAutorizarContainer" class="card-body"></div>
          </div>
          <?php else:?>
          <div class="card card-body">
            <form action="?idSolicitud=<?=$idSolicitud?>" method="post">
              <div class="form-group">
                <label>Usuario</label>
                <input type="text" class="form-control" name="usuario" required>
              </div>
              <div class="form-group">
                <label>Contraseña</label>
                <input type="text" class="form-control" name="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
          </div>
          <?php endif;?>
        </div>
      </div>
    </div>
  </div>
  <script src="js/vendor/modernizr-3.7.1.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script src="js/plugins.js"></script>
  <script src="js/bootstrap.js"></script>
  <script src="js/linq.js"></script>
  <script src="js/handlebars-v4.2.0.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
  <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.5.0/js/bootstrap4-toggle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>
  <script src="js/login.js"></script>
</body>

</html>
