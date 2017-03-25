var http = require('http'),
    path = require("path"),
    fs = require('fs');

let url, loadfile, parsed;

fs.readFile('./public/index.html', function (err, html) {
    if (err) {
        throw err; 
    }  

 http.createServer(function(request, response) { 
    url =  request.url;
    parsed = path.parse(url);

    loading(url);

  setTimeout( () =>{
     
      if(parsed.dir == '/img'){
          if(loadfile){
            response.writeHeader(200, {"Content-Type": "image/"+parsed.ext}); 
            console.log("IMG");
            response.write('Image loaded'); 
            response.end();
         }
         else {
            response.writeHead(404, "not found"); 
            console.log("NOT IMG"); 
            response.write('404');
            response.end();
         }
      }
      else if(parsed.dir == '/css'){
        if(loadfile){
          response.writeHeader(200, {"Content-Type": "image/"+parsed.ext}); 
          console.log("CSS"); 
          response.write('CSS loaded');
          response.end();
        }
        else{
          response.writeHead(404, "not found"); 
          console.log("NOT CSS"); 
          response.write('404');
          response.end();
        }
      }
      else if(parsed.dir == '/js'){
        if(loadfile){
          response.writeHeader(200, {"Content-Type": "image/"+parsed.ext}); 
          console.log("JS");
          response.write('JS loaded'); 
          response.end();
        }
        else{
          response.writeHeader(404, "not Found"); 
          console.log("NOT JS"); 
          response.write('404');
          response.end();
        }
      }
      else if(parsed.dir == '/' && parsed.base == ''){
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);  
          response.end(); 
      }
      else {
           response.writeHeader(404, "not Found"); 
          console.log("NOT FOLDER"); 
          response.write('404');
          response.end();
      }

  }, 2000);
 }).listen(3000);

});



function loading(url) { 
      fs.readFile('./public'+url, function (err, file) {
      if (err) { 
        loadfile = false;
      } 
      else {
        loadfile = true;
      }
    }) 
   
};