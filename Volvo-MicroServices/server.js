'use strict';

var fs = require('fs');
var file = __dirname + '/msdl.json';
var payload = null;
var port = null;
var http = require('http');

fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    payload = JSON.parse(data);
    port = payload.Services[0].port;

    for (var i in payload.Services) {
        var obj = payload.Services[i];

        createMicroService(obj);
    }

});


function createMicroService(ms) {

    console.dir(ms.data);

    http.createServer(function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(ms.data));
    }).listen(ms.port);

}


