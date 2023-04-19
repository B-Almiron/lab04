function parse_vars(req) {
  var arreglo_parametros = [];
  var parametros = [];
  var valores = [];

  if (req.url.indexOf("?") > 0) {
    var url_data = req.url.split("?");
    arreglo_parametros = url_data[1].split("&");
  }

  for (i = 0; i < arreglo_parametros.length; i++) {
    var parametro = arreglo_parametros[i];
    var param_data = parametro.split("=");
    parametros[i] = param_data[0];
    valores[i] = param_data[1];
  }

  dax = "";
  dax = valores[0];
  let fechaObj = new Date(Date.parse(dax));

  // Obtener la fecha actual
  let fechaActual = new Date();

  // Calcular la diferencia en milisegundos entre la fecha actual y la fecha ingresada
  let diferencia = fechaObj - fechaActual;

  // Calcular la cantidad de días faltantes
  let diasFaltantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

  return {
    parametros: parametros,
    valores: valores,
    diasFaltantes: diasFaltantes,
  };
}

function obtenerHora() {
  let fechaActual = new Date();
  let hora = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();
  let segundos = fechaActual.getSeconds();

  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  return hora + ":" + minutos + ":" + segundos;
}

function hora12() {
  let fechaActual = new Date();
  let hora = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();
  let meridiano = "AM";

  if (hora > 12) {
    hora = hora - 12;
    meridiano = "PM";
  }

  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }

  return hora + ":" + minutos + " " + meridiano;
}

function fechActu() {
  let fechaActual = new Date();
  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;
  let anio = fechaActual.getFullYear();

  let fechaString = `${dia}/${mes}/${anio}`;

  return fechaString;
}

module.exports.hora = {
  hora1: obtenerHora,
  hora2: hora12,
  fech: fechActu,
};

module.exports.parse_vars = parse_vars;

module.exports.batman = {
  identidad: "Bruce wayne",
  poder: "Dinero",
};
