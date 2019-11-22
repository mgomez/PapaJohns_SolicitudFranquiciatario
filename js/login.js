/**
 *
 * MAIN @zkar13
 *
 */
var docRef;
var dataSolicitud = {};
var _solicitud = "";
$(function() {
  $("#loading").hide();
  //informacion de la solicitud
  docRef = db.collection("solicitudes").doc(idSolicitud); +

  docRef.get().then(function(doc) {
    dataSolicitud = doc.data();
    $.get("_solicitud.html").then(function(tpl) {
      console.log(idSolicitud, dataSolicitud);

      dataSolicitud.muestraBotones = dataSolicitud.autorizado !== "false";

      var renderData = Handlebars.compile(tpl)(dataSolicitud);

      $("#frmAutorizarContainer").html(renderData);
      //Autorizar
      $("#frm-solicitud").on("submit", function() {
        db.collection("solicitudes").doc(idSolicitud).update({
          autorizado: true
        }).then(function() {
          Swal.fire("Listo", "Se autorizo correctamente la solicitud", "success");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });

        return false;
      });
      //Rechazar solicitud
      $("#btnRechazar").on("click", function() {
        Swal.fire({
          title: 'Esta seguro de rechazar la solicitud?',
          text: "Esta se borrara de forma permanente.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si!'
        }).then((result) => {
          if (result.value) {
            db.collection("solicitudes").doc(idSolicitud).delete().then(function() {
              Swal.fire("Listo", "Document successfully deleted!", "success").then(function() {
                window.location.reload();
              });
            }).catch(function(error) {
              console.error("Error removing document: ", error);
            });
          }
        });
      });
    });
  });
  //envia solicitud
  $("#frm-solicitud").validate();
});



$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

jQuery.extend(jQuery.validator.messages, {
  required: "Este campo es obligatorio.",
  remote: "Por favor, rellena este campo.",
  email: "Por favor, escribe una dirección de correo válida",
  url: "Por favor, escribe una URL válida.",
  date: "Por favor, escribe una fecha válida.",
  dateISO: "Por favor, escribe una fecha (ISO) válida.",
  number: "Por favor, escribe un número entero válido.",
  digits: "Por favor, escribe sólo dígitos.",
  creditcard: "Por favor, escribe un número de tarjeta válido.",
  equalTo: "Por favor, escribe el mismo valor de nuevo.",
  accept: "Por favor, escribe un valor con una extensión aceptada.",
  maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
  minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
  rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
  range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
  max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
  min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
});
