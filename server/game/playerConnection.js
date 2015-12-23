const EventEmitter = require('events').EventEmitter;
const util = require('util');

// TODO: inherit from Player ? 

function PlayerConnection(socket, player) {
  this.socket = socket;
  this.player = player;
  
  socket.on('userAction', function(msg) {
    // TODO: reafactor userAction -> to handler
    const jmsg = JSON.parse(msg);
    
    // enter
    if(jmsg.action === "roomEnter") {
      if(!onEnterGame(jmsg.data.name)) {
        res.status(403).send("Can't login with username " + jmsg.data.name);
      } else {
      }
    }
    console.log('user action: ' + msg);
  });
  
  const self = this;
  socket.on('disconnect', function() {
    self.emit('disconnect', self);
  });
  
  
}

util.inherits(PlayerConnection, EventEmitter);

PlayerConnection.prototype.sendObj = function(commandName, data) {
  var obj = {
    command: commandName,
    data: data
  }
  this.socket.send(JSON.stringify(obj));
}

PlayerConnection.prototype.enterRoom = function(players) {
  this.sendObj('enterRoom', players);
}

PlayerConnection.prototype.addPlayer = function(player) {
  this.sendObj('addPlayer', player);
}

PlayerConnection.prototype.removePlayer = function(playerId) {
  this.sendObj('removePlayer', playerId);
}

PlayerConnection.prototype.startGame = function(gameInit) {
  this.sendObj('enterGame', gameInit);
}

module.exports = PlayerConnection;