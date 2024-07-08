const ioserver = require('socket.io-client');

// Connect to the Socket.IO server
const io = ioserver('http://localhost:5002'); // Replace with your server's URL

// Event listener for the 'connect' event
io.on('connect', () => {
  console.log('Connected to server');
});

// Event listener for the 'disconnect' event
io.on('disconnect', () => {
  console.log('Disconnected from server');
});

module.exports = io;