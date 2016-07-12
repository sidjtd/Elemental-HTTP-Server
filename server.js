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
  queried = querystring.parse(chunk.toString());
  });

  req.on('end', function(chunk) {
    console.log(queried);

         /* ERROR STUFF
          try { if(queried.elementName[length]===0);
            //if(queried.elementName===undefined||queried.elementSymbol===undefined||queried.elementAtomicNumber===undefined||queried.elementDescription===undefined);
           }
          catch(err){
            throw "Please fill in all boxes";
            }*/
    fs.writeFile('./public/'+(queried.elementName.toLowerCase())+".html", newHTML(queried), 'utf8', (err) => {
    });
          // body = Buffer.concat(body).toString();
          // at this point, `body` has the entire request body stored in it as a string

    indexHTMLChanger(req, res, queried);
  });
}


function indexHTMLChanger(req, res, passObject){
      console.log("we made it");

    fs.readFile('./public/index.html', function(error, data) {
      var stringed = data.toString();
      var replaced = stringed.replace("elements","ELEPAHANTS");
      console.log(replaced);
      // res.writeHead(200, {'Content-Type': 'text/html'});
      // res.write(data.toString());
      res.end();
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
    <h1>${queried.elementName}</h1>
    <h2>${queried.elementSymbol}</h2>
    <h3>Atomic number ${queried.elementAtomicNumber}</h3>
    <p>${queried.elementName} is a chemical element with symbol ${queried.elementSymbol} and atomic number ${queried.elementAtomicNumber}. ${queried.elementDescription} </p>
    <p><a href="/">back</a></p>
  </body>
  </html>`;
  // return htmlInfo;
}

server.listen(PORT, () => console.log (`server listening on port ${PORT}`));
