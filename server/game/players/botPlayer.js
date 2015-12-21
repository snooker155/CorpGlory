const Player = require('./Player.js');
const util = require('util');

function BotPlayer(name) {
  Player.call(this, name);
  var self = this;
  setInterval(function() {
    self.clickOnRegion('OC');
  }, 1500);
}
util.inherits(BotPlayer, Player);

module.exports = BotPlayer;