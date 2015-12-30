const EventEmitter = require('events').EventEmitter;
const util = require('util');

function Player(name) {
  // TODO: rename 'name' to 'id' (it is used as id)
  this.name = name;
  this.ready = false;
  this.money = 1000;
  this.game = undefined;
}
util.inherits(Player, EventEmitter);

Player.prototype.enterToGame = function(game) {
  this.game = game;
  this.emit('enterToGame');
}

Player.prototype.getInit = function() {
  return {
    name: this.name
  }
}

Player.prototype.getState = function(player) {
  if(player === this) {
    return {
      money: this.money
    }
  } else {
    return {
    };
  }
}

Player.prototype.clickOnRegion = function(regionId) {
  var price = this.game.regions[regionId].getClickPrice();
  if(price > this.money) {
    // TODO: write error to console
    return;
  }
  this.money -= price;
  this.game.playerRegionClick(this, regionId);
}

Player.prototype.update = function() {
  
}

module.exports = Player;