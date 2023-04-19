var http = require("http"),
  fs = require("fs"),
  modu = require("./lab04modu.js"),
  p = modu.modulos;
  p2 = modu.modulos2
http
  .createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('¡Bienvenido al sitio web!');
    } 
    else if (req.url === '/inicio') {
        fs.readFile('./inicio.html', function(err,html){
            var html_string = html.toString();

            if(req.url.indexOf('?')>0){
                var url_data = req.url.split('?');
                arreglo_parametros = url_data[1].split('&');

                for(var i =0; i<arreglo_parametros.length; i++){
                    var parametro = arreglo_parametros[i];
                    var param_data = parametro.split('=');
                    parame[i] = param_data[0];
                    valores[i] = param_data[1];
                }

                for(var i=0; i<parametros.length; i++){
                    html_string = html_string.replace('{'+parame[i]+'}',valores[i]);
                }
            }

            res.writeHead(200,{'Content-type': 'text/html'});
            res.write(html_string);
            res.end();
        });
    } else {
    fs.readFile("./form4.html", function (err, html) {

        
      var html_string = html.toString();

      var respuesta = p(req),
        parametros = respuesta["parametros"];
      valores = respuesta["valores"];
      parametro = respuesta["parametro"];
      check = respuesta["check"];

      var resultado = 0

      switch (check) {
        case 1:
        resultado = parseInt(parametros[0]) + parseInt(valores[0])
          break;
        case 2:
        resultado = parseInt(parametros[0]) - parseInt(valores[0])
          break;
        case 3:
            resultado = parseInt(parametros[0]) / parseInt(valores[0])
          break;
        case 4:
            resultado = parseInt(parametros[0]) * parseInt(valores[0])
          break;
      }
      for (var i = 0; i < parametros.length; i++) {

        html_string = html_string.replace("{dat1}", parametros[i]);
        html_string = html_string.replace("{dat2}", valores[i]);
      }
      html_string = html_string.replace("{hora2}", resultado);
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(html_string);
      res.end();
    });
    }
  })
  .listen(8080);
