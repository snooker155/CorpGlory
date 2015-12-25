const EventEmitter = require('events').EventEmitter;
const util = require('util');

function Player(name) {
  this.name = name;
  this.ready = false;
  this.game = undefined;
}
util.inherits(Player, EventEmitter);

Player.prototype.enterToGame = function(game) {
  this.game = game;
  this.emit('enterToGame');
}

Player.prototype.getState = function(player) {
  if(player === this) {
    return 'interesting data about me';
  } else {
    return 'some data';
  }
}

Player.prototype.clickOnRegion = function(regionId) {
  this.game.playerRegionClick(this, regionId);
}

module.exports = Player;