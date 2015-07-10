'use strict';

const net = require('net');

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

const server = net.createServer(connectionHandler);

const PORT = 3333;

server.listen(PORT, function() {
  console.log('Awaiting connections...');
})
