// REQUIRES
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Game = require('./game.js');
const Player = require('./player.js');


// GAME CONFIG
var players = [new Player("Eduard"), new Player("Anton"), new Player("Alexey")];
var game = new Game(players);

// -----------------------
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(4000, function() {
  console.log('listening on *:4000');
});

// -----------------------
io.on('connection', function(socket) {
  // init player
  var initObj = {
    command: 'init',
    data: players
  }
  socket.send(JSON.stringify(initObj));
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('userAction', function(msg) {
    console.log('user action: ' + msg);
  });
});

game.on('nextGameState', function(state) {
  io.emit('nextGameState', state);
});