const EventEmitter = require('events').EventEmitter;
const util = require('util');


function Game(players) {
  EventEmitter.call(this);
  for(var p in players) {
    players[p].enterToGame(this);
  }
}
util.inherits(Game, EventEmitter);


Game.prototype.playerRegionClick = function(player, regionId) {
};

module.exports = Game;