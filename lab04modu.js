function modulos(req) {
  var arreglo_parametros = [];
  var parametros = [];
  var valores = [];

  if (req && req.url && req.url.indexOf("?") > 0) {
    var url_data = req.url.split("?");
    arreglo_parametros = url_data[1].split("&");
  }

  for (i = 0; i < arreglo_parametros.length; i++) {
    var parametro = arreglo_parametros[i];
    var check = 0
    if (parametro.includes("+")) {
        var param_data = parametro.split("+");
        check = 1
      } else if (parametro.includes("-")) {
        var param_data = parametro.split("-");
        check = 2
      }else if (parametro.includes("/")) {
        var param_data = parametro.split("/");
        check = 3
      }else if (parametro.includes("*")) {
        var param_data = parametro.split("*");
        check = 4
      }

    parametros[i] = param_data[0];
    valores[i] = param_data[1];
  }

  return {
    parametros: parametros,
    valores: valores,
    check:check,
  };
}

module.exports.modulos = modulos;

