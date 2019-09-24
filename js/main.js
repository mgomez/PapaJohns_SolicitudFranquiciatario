/**
 *
 * MAIN @zkar13
 *
 */
var data = [];
var dataFinal = [];
var Actual = {};
var _options = "<option value='' disabled selected>Seleccione una opcion</option>{{#each this}}<option value='{{value}}'>{{text}}</option>{{/each}}";

$(function() {
  $("#loading").hide();
  //select2
  $("select").select2();
  //informacion general
  $.get("js/data.json").then(function(r) {
    data = r;
    //formato a la informacion
    dataFinal = Enumerable.from(data).groupBy("$.Franquicia").select(function(el) {
      var source = el.getSource();

      var estados = Enumerable.from(source).groupBy("$.Estado").select(function(estado) {
        var ciudades = Enumerable.from(estado.getSource()).groupBy("$.Ciudad").select(function(ciudad) {
          return {
            "Ciudad": ciudad.key(),
            "Data": Enumerable.from(ciudad.getSource()).select(function(_el) {
              return {
                Corporativo: _el["Nombre del corporativo"],
                Nombrecomercial: _el["Nombre comercial"],
                GrupoWhatsapp: _el["Grupo de Whatsapp"],
                Direccion: _el.Direccion,
                Telefono: _el.Telefono,
                Envio: _el.Envio
              }
            }).toArray()
          };
        }).toArray();

        return {
          "Estado": estado.key(),
          "Ciudades": ciudades
        };
      }).toArray();

      return {
        "Franquicia": el.key(),
        "Estados": estados
      };
    }).toArray();
    //combo franquicias 
    var Franquicias = Enumerable.from(dataFinal).select(function(el) {
      return {
        "value": (el.Franquicia).replace(/\s/g, "_"),
        "text": el.Franquicia
      }
    }).toArray();

    var renderOptions = Handlebars.compile(_options)(Franquicias);

    $("#cbGrupos").html(renderOptions);
  });
  //cambio de franquicia
  $("#cbGrupos").on("change", function() {
    var franquicia = $(this).find("option:selected").text();

    if (franquicia) {
      var optionEstados = estadosFranquicia(franquicia);
      var renderOptions = Handlebars.compile(_options)(optionEstados);

      $("#cbEstados").html(renderOptions);
    }
  });
  //cambio de estado
  $("#cbEstados").on("change", function() {
    var estado = $(this).find("option:selected").text();

    if (estado) {
      var optionCiudades = ciudadesEstado(estado);
      var renderOptions = Handlebars.compile(_options)(optionCiudades);

      $("#cbCiudades").html(renderOptions);
    }
  });
  //cambio de ciudad
  $("#cbCiudades").on("change", function() {
    var ciudad = $(this).find("option:selected").text();

    if (ciudad) {
      var optionSucursales = sucursalesCiudad(ciudad);
      var renderOptions = Handlebars.compile(_options)(optionSucursales);

      $("#cbSucursales").html(renderOptions);
    }
  });
  //envia solicitud
  $("#frm-solicitud").on("submit", function() {
    var $frm = $(this);
    if ($frm.valid()) {
      var formData = $frm.serializeObject();

      console.log(formData);

      db.collection("solicitudes").add(formData)
        .then(function(docRef) {
          console.log("Document written with ID(idSolicitud): ", docRef.id);
          formData.idSolicitud = docRef.id;
          formData.fechaAlta = moment().format("YYYY-MM-DD HH:mm:ss");

          $.ajax({
              url: 'email.php',
              type: 'POST',
              dataType: 'json',
              data: formData,
            })
            .done(function(r) {
              if (!r.Success) {
                Swal.fire("Error", "Ocurrió un error inesperado. por favor intentalo más tarde.", "error");
              } else {
                Swal.fire("Listo", "Se ha creado correctamente la solicitud", "success").then(function() {
                  window.location.reload();
                });
              }
            })
            .fail(function() {
              console.log("error");
            })
            .always(function() {
              console.log("complete");
            });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      return false;
    }

    return false;
  }).validate();
});

function estadosFranquicia(franquicia) {
  var Franquicia = Enumerable.from(dataFinal).where("$.Franquicia == '" + franquicia + "'").firstOrDefault();

  var Estados = Enumerable.from(Franquicia.Estados).select(function(el) {
    return {
      "value": (el.Estado).replace(/\s/g, "_"),
      "text": el.Estado
    }
  }).toArray();

  Actual = Franquicia;

  return (Estados);
}

function ciudadesEstado(estado) {
  var Estado = Enumerable.from(Actual.Estados).where("$.Estado == '" + estado + "'").firstOrDefault();

  var ciudades = Enumerable.from(Estado.Ciudades).select(function(el) {
    return {
      "value": (el.Ciudad).replace(/\s/g, "_"),
      "text": el.Ciudad
    }
  }).toArray();

  Actual.Estado = Estado;

  return (ciudades);
}

function sucursalesCiudad(ciudad) {
  var Ciudad = Enumerable.from(Actual.Estado.Ciudades).where("$.Ciudad == '" + ciudad + "'").firstOrDefault();

  var sucursales = Enumerable.from(Ciudad.Data).select(function(el) {
    return {
      "value": (el.Corporativo).replace(/\s/g, "_"),
      "text": el.Corporativo
    }
  }).toArray();

  Actual.Ciudad = ciudad;

  return (sucursales);
}

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
