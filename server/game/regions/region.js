const _ = require('underscore');

var Region = function(playerIds) {
  this.shares = {};
  for(var i in playerIds) {
    var pid = playerIds[i];
    this.shares[pid] = 0.05 + i / 20;
  };
}

Region.prototype.update = function() {
  var sum = _.reduce(this.shares, (s, v) => s + v, 0);
  var remain = 1 - sum;
  for(var s in this.shares) {
    this.shares[s] += remain * this.shares[s];
  }
}

Region.prototype.getState = function() {
  return this.shares;
}

Region.prototype.playerClick = function(player) {
  console.log('Region.prototype.playerClick' + player.name);
}

module.exports = Region;