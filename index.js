var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response) {
    var staticUrl;
    switch(request.url) {
        case '/index':
        case '/test':
        case '/':
            staticUrl = '/test.html';
            break;
        default:
            staticUrl = request.url;
    }

    var filePath = path.join(__dirname, 'sample') + staticUrl;
    fs.readFile(filePath, 'binary', function(err, fileContent){
        if(err) {
            response.writeHead(404, 'not found');
            response.end('<h1>404 Not Found</h1>');
        }else {
            response.writeHead(200, 'OK');
            response.write(fileContent, 'binary');
            response.end();
        }
    });
});

server.listen(8000);