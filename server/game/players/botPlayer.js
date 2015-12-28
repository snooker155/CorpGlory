const Player = require('./Player.js');
const util = require('util');
const Regions = require('../regions/regions.js');
const _ = require('underscore');

function BotPlayer(name) {
  Player.call(this, name);
  const self = this;
  this.ready = true;
  this.on('enterToGame', function() {
    var keys = Regions.NAMES;
    setInterval(function() {
      self.clickOnRegion(_.sample(keys));
    }, 1500);
  });
}
util.inherits(BotPlayer, Player);

module.exports = BotPlayer;