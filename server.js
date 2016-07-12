/* ▂▃▅▇█▓▒░۩۞۩     ♚  ♛  ♜  ♝  ♞  ♟      ★★     ♔   ♕  ♖  ♗  ♘  ♙     ۩۞۩░▒▓█▇▅▃▂
   ------------------------------------------------------------------------------
   |                        Elemental HTTP Server
   ______________________________________________________________________________
   ------------------------------------------------------------------------------  */
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;
const http = require('http');
const fs = require('fs');
'use strict';
// var PORT = 3000;
// if( process.env.PORT ){
//   PORT = process.env.PORT;
// }
const ELEMENT_TEMPLATE = ``;

function newHTML(queried) {
/*  var htmlInfo;
  htmlInfo = */
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The Elements - ${queried.elementName}</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <h1>Helium</h1>
    <h2>H</h2>
    <h3>Atomic number ${queried.elementAtomicNumber}</h3>
    <p>${queried.elementName} is a chemical element with symbol ${queried.elementSymbol} and atomic number ${queried.elementAtomicNumber}. ${queried.elementDescription} </p>
    <p><a href="/">back</a></p>
  </body>
  </html>`;
  // return htmlInfo;
}



function renderTemplate(template, locals){

}

function writeFile(filePath, fileContent){
  fs.writeFile(filePath, fileContent);
  // error handling
}

/*4040404*/
  function send404(res){
    fs.readFile('./public/404.html', function(error, data){
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(data.toString());
      res.end();
    });
  }

function handleGET(req, res){
  // ^ Read file from REQ, send that file to client
// handleGet
/*
 * read in request data
 * parse the data into Object
 * prepare data to be written
 * render a template using that Object
 * save the rendered template
 * send OK message to user
 */
    if(req.url==='/'){
      // ^ make index.html default doc
      req.url = '/index.html';
    }
                      // Data comes in bugger format v
  fs.readFile('./public/' + req.url, function(error, data){
    if(error) {
      send404();
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data.toString());
      res.end();
    }
  });// fs.readFile ---<<<<<<
}

function handlePOST(req, res){
  var queried;
  req.on('data', function(chunk) {
    // console.log(chunk);
    // console.log(chunk.toString());
    req.on('end', function() {
      queried = querystring.parse(chunk.toString());
      console.log(queried);

      fs.writeFile('./public/'+queried.elementName+".html", newHTML(queried), 'utf8', (err) => {
      console.log('saved!');

      });

      // body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string
    });
  });
}

const server = http.createServer((req, res) => {
  // someone connected
  switch( req.method ){
    case 'GET':
      handleGET(req, res);
      break;
    case 'POST':
      handlePOST(req, res);
      break;
    default:
      send404(res);
  }
});
server.listen(PORT, () => console.log (`server listening on port ${PORT}`));
