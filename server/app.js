// REQUIRES
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tail = require('always-tail2');

var gameNativeModule = require("../Game/NodeWrapper/build/Release/GameWrapper.node");

// GAME CONFIG
var players = [{name: "Eduard"}, {name: "Anton"}, {name: "Alexey"}];
var game = gameNativeModule.NewGame(players);

var coutTail = new tail(__dirname + "/logs/cout.txt");
var cerrTail = new tail(__dirname + "/logs/cerr.txt");
coutTail.on('line', function(line) { console.log(line); });
cerrTail.on('line', function(line) { console.log(line); });


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

setInterval(function() {
  io.emit('nextGameState', game.gameState());
}, 1000);


