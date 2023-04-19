var http = require("http"),
  fs = require("fs"),
  parser = require("./parser_var.js"),
  p = parser.parse_vars
  datos = parser.batman
  hora1 = parser.hora


  http.createServer(function (req, res){
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('¡Bienvenido al sitio web!');
    } 
    else if (req.url === '/inicio') {
        fs.readFile(__dirname + '/inicio.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    else if (req.url === '/galeria') {
        fs.readFile(__dirname + '/fotos.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    else {
        fs.readFile('./form.html', function(err,html){
            var html_string = html.toString();
      
            var respuesta = p(req),
              parametros = respuesta["parametros"];
            valores = respuesta["valores"];
            diasFaltantes = respuesta['diasFaltantes']
      
            for (var i = 0; i < parametros.length; i++) {
              html_string = html_string.replace("{" + parametros[i] + "}",valores[i]
              );
            }
      
            html_string = html_string.replace('{dia2}',diasFaltantes)
      
            html_string = html_string.replace('{hora1}',hora1['hora1'])
            html_string = html_string.replace('{hora2}',hora1['hora2'])
            html_string = html_string.replace('{hora3}',hora1['fech'])
      
            html_string = html_string.replace('{identidad}',datos['identidad'])
            html_string = html_string.replace('{poder}',datos['poder'])
      
            res.writeHead(200, { "Content-type": "text/html" });
            res.write(html_string);
            res.end();
          });
    }

}).listen(8080);
