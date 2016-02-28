'use strict';

var net = require('net');
var http = require('http');
var cluster = require('cluster');
var nCPU = require('os').cpus().length;

function println(text) {
  return text + '\n'; 
}

function ConnectionHandler() {
  return function(socket) {
    console.log('A user connected.');
    console.log('Remote Addr: ', socket.remoteAddress);
    socket.write(println('you\'ve connected.'));
    socket.on('data', function(data) {
      var parsedData = data.toString('utf-8');
      var params = parsedData.split(' ');
      if (params[0] === 'name') {
        socket.name = params[1];
      }
      console.log('User ' + socket.name + ' sent: ', data.toString('utf-8'));
    }) 
    socket.on('close', function() {
      console.log('User disconnected.');
    });
  }
}

function createServer(connectionHandler) {
  return net.createServer(connectionHandler);
}

var server = createServer(ConnectionHandler());
var server2 = createServer(ConnectionHandler());

server.listen(3333, function() {
  console.log('listening');
  console.log('Server CPU Info: Cores:', nCPU);
  // console.log(require('os').cpus());
});

server2.listen(8080, function() {
  console.log('listening');
  console.log('Server CPU Info: Cores:', nCPU);
  //console.log(require('os').cpus());
});


