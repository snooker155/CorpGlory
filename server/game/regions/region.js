const _ = require('underscore');

var Region = function(playerIds) {
  this.shares = {};
  this.clickPrice = 100;
  for(var i in playerIds) {
    var pid = playerIds[i];
    //this.shares[pid] = 0.05 + i / 20;
    this.shares[pid] = Math.random();
  };
}

Region.prototype.update = function() {
  var sum = _.reduce(this.shares, (s, v) => s + v, 0);
  var remain = 1 - sum;
  if(remain > 0){
    for(var s in this.shares) {
      this.shares[s] += remain * this.shares[s];
    }
  }
  this.clickPrice++;
}

Region.prototype.getState = function() {
  return {
    shares: this.shares,
    clickPrice: this.clickPrice
  };
}

Region.prototype.playerClick = function(player) {
  return this.getState();
}


Region.prototype.playerBuyRegionPlace = function(player) {
}


Region.prototype.getClickPrice = function() {
  return this.clickPrice;
}

module.exports = Region;