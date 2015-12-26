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
  var self = this;
  _.each(this.players, function(p) {
    p.enterToGame(self);
  });
};

// get personal for player init game state
Game.prototype.getInitState = function(player) {
  return {
    regions: Regions,
    players: _.map(this.players, p => p.name),
    playerId: player.name
  };
};

Game.prototype.getWorldState = function(player) {
  // TOOD: get specific to the user content
};

Game.prototype.playerRegionClick = function(player, regionId) {
};

module.exports = Game;