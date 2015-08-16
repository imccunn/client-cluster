'use strict';

var http = require('http');

var options = {
  hostname: 'http://localhost',
  post: 8080,
  path: '/',
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS:' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf-8');
  res.on('data', function(chunk) {
   
    console.log('BODY: ' + chunk);
  });
});

req.on('errpr', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
