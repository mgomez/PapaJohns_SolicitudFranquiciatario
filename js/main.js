/**
 *
 * MAIN @zkar13
 *
 */
var data = [];
var dataFinal = [];

$(function() {
  $.get("js/data.json").then(function(r) {
    data = r;

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

    console.log(dataFinal);
  });
});
