// CONFIG

const UPDATE_TIME = 1000;

// REQUIRES

const EventEmitter = require('events').EventEmitter;
const util = require('util');
const Regions = require('./regions/regions.js');

const _ = require('underscore');

function getNames(players) {
  return _.map(players, p => p.name);
}

function Game(players) {
  EventEmitter.call(this);
  this.regions = new Regions(getNames(players));
  this.players = players;
  this.day = 0;
}
util.inherits(Game, EventEmitter);

Game.prototype.start = function() {
  var self = this;
  _.each(this.players, p => p.enterToGame(self));
  setInterval(this.update.bind(this), UPDATE_TIME);
};

// get personal for player init game state
Game.prototype.getInitState = function(player) {
  return {
    regions: this.regions.getInit(),
    players: getNames(this.players),
    playerId: player.name
  };
};

Game.prototype.getWorldState = function(player) {
  // TOOD: get specific to the user content
  return {
    regions: this.regions.getState(player),
    day: this.day,
    player: player.getState(player)
  };
};

Game.prototype.update = function() {
  var v = this;
  this.day++;
  this.regions.update();
  // emulate calculation
  for(var i = 0; i < 1000; i++) {
    
  }
  _.each(this.players, p => p.update());
  this.emit('updateReady');
};

Game.prototype.playerRegionClick = function(player, regionId) {
  this.regions.playerRegionClick(player, regionId);
};

module.exports = Game;