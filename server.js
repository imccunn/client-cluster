'use strict';

var net = require('net');
var http = require('http');
var cluster = require('cluster');
var nCPU = require('os').cpus().length;

function println(text) {
  return text + '\n'; 
}

function connectionHandler(connection) {
  console.log(println('A user connected.'));
  connection.write(println('You\'ve connected.'));
  
  setTimeout(function() {
    connection.write(println('the timer timed a thing'));
  }, 4000);
  
  connection.on('close', function() {
    console.log('User disconnected.');
  });
}

function connectionHandler2(connection) {
  console.log(println('A user connected.'));
  connection.write(println('You\'ve connected.'));
  
  setTimeout(function() {
    connection.write(println('the timer timed a thing'));
  }, 4000);
  
  connection.on('close', function() {
    console.log('User disconnected.');
  });
}
var server = net.createServer(connectionHandler);
var server2 = net.createServer(connectionHandler2);


server.listen(3333, function() {
  console.log('listening');
  console.log('Server CPU Info: Cores:', nCPU);
  console.log(require('os').cpus());
});

server2.listen(8080, function() {
  console.log('listening');
  console.log('Server CPU Info: Cores:', nCPU);
  console.log(require('os').cpus());
});

