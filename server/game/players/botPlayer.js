const Player = require('./Player.js');
const util = require('util');
const Regions = require('../regions.js');
const _ = require('underscore');

function BotPlayer(name) {
  Player.call(this, name);
  var self = this;
}
util.inherits(BotPlayer, Player);

BotPlayer.prototype.onEnterGame = function() {
  var keys = _.keys(Regions);
  setInterval(function() {
    self.clickOnRegion(_.sample(keys));
  }, 1500);
}

module.exports = BotPlayer;