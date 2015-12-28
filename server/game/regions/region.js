var Region = function(playerIds) {
  this.shares = {};
  for(var i in playerIds) {
    var pid = playerIds[i];
    this.shares[pid] = 10;
  };
}

Region.prototype.update = function() {
  
}

Region.prototype.getState = function() {
  return this.shares;
}

module.exports = Region;