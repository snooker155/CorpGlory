const EventEmitter = require('events').EventEmitter;
const util = require('util');
const Regions = require('./regions.js');

const _ = require('underscore');

function Game(players) {
  EventEmitter.call(this);
  this.regions = Regions;
  this.players = players;
  
}
util.inherits(Game, EventEmitter);

Game.prototype.start = function() {
  _.each(this.players, function(p) {
    p.enterToGame(this);
  });
};

// get personal for player init game state
Game.prototype.getInit = function(player) {
  return {
    regions: Regions,
    players: this.players
  };
};

Game.prototype.getWorldState = function() {
  
};

Game.prototype.playerRegionClick = function(player, regionId) {
};

module.exports = Game;