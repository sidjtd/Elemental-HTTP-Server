/*                                ▂▃▅▇▓▒▓▇▅▃▂
                              ▂▃▅▇▓▒░  ★★ ░▒▓▇▅▃▂
                          ▂▃▅▇▓▒░♚♛♜♝♞♟★★♔♕♖♗♘░▒▓▇▅▃▂
                      ▂▃▅▇▓▒░۩۞۩♚♛♜♝♞♟ ★★ ♔♕♖♗♘۩۞۩░▒▓▇▅▃▂
                  ▂▃▅▇█▓▒░۩۞۩♚♛♜♝♞ ♟   ★★   ♔♕♖♗♘♙۩۞۩░▒▓█▇▅▃▂
              ▂▃▅▇█▓▒░۩۞۩♚ ♛ ♜ ♝ ♞ ♟   ★★   ♔ ♕  ♖  ♗♘♙۩۞۩░▒▓█▇▅▃▂
           ▂▃▅▇█▓▒░۩۞۩ ♚ ♛ ♜  ♝  ♞ ♟   ★★   ♔ ♕   ♖  ♗  ♘ ♙۩۞۩░▒▓█▇▅▃▂
       ▂▃▅▇█▓▒░۩۞۩  ♚  ♛  ♜  ♝  ♞  ♟   ★★   ♔  ♕  ♖  ♗  ♘  ♙   ۩۞۩░▒▓█▇▅▃▂
   ▂▃▅▇█▓▒░۩۞۩     ♚  ♛  ♜  ♝  ♞   ♟   ★★   ♔    ♕  ♖  ♗  ♘  ♙     ۩۞۩░▒▓█▇▅▃▂
   ------------------------------------------------------------------------------
   |                        Elemental HTTP Server
   ______________________________________________________________________________
   ------------------------------------------------------------------------------  */
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;
const http = require('http');
const fs = require('fs');
'use strict';
    // ^ This does the same thing as const above
    // var PORT = 3000;
    // if( process.env.PORT ){
    //   PORT = process.env.PORT;
    // }
const ELEMENT_TEMPLATE = ``;

function renderTemplate(template, locals){
}
//  __    __ _____  _____ __ __    _____  _____  __ __  __ _____
//  \\ /\ //((   )) ||_// ||<<     ||_// ((   )) || ||\\||  ||
//   \V/\V/  \\_//  || \\ || \\    ||     \\_//  || || \||  ||
function handlePUT(){
};

function handleDELETE(req, res){
    req.on('data', function(chunk) {
      var queried = querystring.parse(chunk.toString());
      fs.unlink(`./public/${queried.elementName}.html`);
    //queried = querystring.parse(chunk.toString());
    });
}

/*  ----------------------------------------------------------------------------
   / ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★   COMPLETED!  ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★  \
   ______________________________________________________________________________
   ------------------------------------------------------------------------------  */
/*                Handle Get ✓
 ____________________________________________________
 ----------------------------------------------------  */
function handleGET(req, res){
    // If the URL is empty, make it INDEX.HTML
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
  });//readFile ---<<<
}// main ---<<<
/*                Handle Post ✓
 ____________________________________________________
 ----------------------------------------------------  */
function handlePOST(req, res){
  var queried;
  req.on('data', function(chunk) {
  queried = querystring.parse(chunk.toString());
  });

  req.on('end', function(chunk) {
    //console.log("✓",queried.elementName.length);
          //ERROR STUFF
          try { if(
            queried.elementName.length<=2||
            queried.elementSymbol.length!==2//||
            //queried.elementSymbol === 'string'
            //||
            //queried.elementAtomicNumber===isNan
            ) throw "name missing";
            //if(queried.elementName===undefined||queried.elementSymbol===undefined||queried.elementAtomicNumber===undefined||queried.elementDescription===undefined);
          }
          catch(err){
            throw "Empty Entry and/or Symbol name is not 2 characters";
            }
    fs.writeFile('./public/'+(queried.elementName.toLowerCase())+".html", newHTML(queried), 'utf8', (err) => {
    });
    indexHTMLChanger(req, res, queried);
  });//readFile ---<<<
} // main ---<<<
/*               Function - HTML Post Updater ✓
 ____________________________________________________
 ----------------------------------------------------  */
function indexHTMLChanger(req, res, passObject){
  var replacerText = `<li>
      <a href="/${passObject.elementName}.html">\
      ${passObject.elementName}</a>\
    </li>
  </ol>`;

    fs.readFile('./public/index.html', function(error, data) {
      var stringed = data.toString();
      var replaced = stringed.replace('</ol>',replacerText);
            console.log(replaced);
      // res.writeHead(200, {'Content-Type': 'text/html'});
    fs.writeFile("./public/index.html", replaced, 'utf8', (err) => {
    });
      res.end();
    });

}// main ---<<<
/*                Send 404 ✓
 ____________________________________________________
 ----------------------------------------------------  */
  function send404(res){
    fs.readFile('./public/404.html', function(error, data){
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(data.toString());
      res.end();
    });
  }
function writeFile(filePath, fileContent){
  fs.writeFile(filePath, fileContent);
  // error handling
}

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
}
/*                CREATE SERVER ✓
 ____________________________________________________
 ----------------------------------------------------  */
const server = http.createServer((req, res) => {
  // someone connected
  switch( req.method ){
    case 'GET':
      handleGET(req, res);
      break;
    case 'POST':
      handlePOST(req, res);
      break;
    case 'DELETE':
      handleDELETE(req, res);
      break;
    default:
      send404(res);
  }
});// main ---<<<
/*______________________________________________________________________________
  ------------------------------------------------------------------------------  */
server.listen(PORT, () => console.log (`server listening on port ${PORT}`));
