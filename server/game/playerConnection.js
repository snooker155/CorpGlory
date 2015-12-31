const EventEmitter = require('events').EventEmitter;
const util = require('util');

// TODO: inherit from Player ? 

function PlayerConnection(socket, player) {
  this.socket = socket;
  this.player = player;
  const self = this;
  
  socket.on('userAction', function(msg) {
    // TODO: reafactor userAction -> to handler
    const jmsg = JSON.parse(msg);

    // enter
    if(jmsg.action === 'ready') {
      self.player.ready = true;
      self.emit('ready', self);
    }
    
    if(jmsg.action === 'regionClick') {
      self.selectRegion(jmsg.data.regionId);
    }
    
  });

  socket.on('disconnect', function() {
    self.emit('disconnect', self);
  });

  player.on('enterToGame', self.enterGame.bind(self));
}

util.inherits(PlayerConnection, EventEmitter);

PlayerConnection.prototype.sendObj = function(commandName, data) {
  var obj = {
    command: commandName,
    data: data
  };
  this.socket.send(JSON.stringify(obj));
}

PlayerConnection.prototype.enterRoom = function(players) {
  this.sendObj('enterRoom', players);
}

PlayerConnection.prototype.addPlayer = function(player) {
  this.sendObj('addPlayer', player);
}

PlayerConnection.prototype.disconnectPlayer = function(playerId) {
  this.sendObj('disconnectPlayer', playerId);
}

PlayerConnection.prototype.readyPlayer = function(playerId) {
  this.sendObj('readyPlayer', playerId);
}

PlayerConnection.prototype.enterGame = function() {
  var state = this.player.game.getInitState(this.player);
  this.sendObj('enterGame', state);
  this.player.game.on('updateReady', this.update.bind(this));
}

PlayerConnection.prototype.update = function() {
  this.sendObj('update', this.player.game.getWorldState(this.player));
}


PlayerConnection.prototype.selectRegion = function(regionId) {
  this.sendObj('selectRegion', this.player.game.regions.playerRegionClick(this.player, regionId));
}

module.exports = PlayerConnection;