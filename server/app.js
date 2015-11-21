// REQUIRES
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var gameNativeModule = require("../Game/NodeWrapper/build/Release/GameWrapper.node");

// GAME CONFIG
var players = [{name: "Eduard"}, {name: "Anton"}, {name: "Alexey"}];
var game = gameNativeModule.NewGame(players);

// -----------------------
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(4000, function() {
  console.log('listening on *:4000');
});

// -----------------------
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('userAction', function(msg) {
    console.log('message: ' + msg);
  });
});

setInterval(function() {
  io.emit('nextGameState', game.gameState());
}, 1000);


