var Regions = function(playerIds) {
  this.regions = ['EU', 'AS', 'OC', 'AF', 'SA', 'NA'];
  for(var i in this.regions) {
    var r = this.regions[i];
    this[r] = new Region(playerIds);
  }
}

Regions.prototype.update = function() {
  // TODO: update all regions
  for(var i in this.regions) {
    var r = this.regions[i];
    this[r].update();
  }
}

Regions.prototype.getInit = function() {
  var res = {}
  for(var i in this.regions) {
    var r = this.regions[i];
    res[this.regions[i]] = { };
  }
  return res;
}
 
Regions.prototype.getState = function() {
  var res = {};
  for(var i in this.regions) {
    var r = this.regions[i];
    res[r] = this[r].getState();
  }
  return res;
}

var Region = function(playerIds) {
  this.playerIds = playerIds;
  for(var pid in playerIds) {
    this[pid] = 0;
  };
}

Region.prototype.update = function() {
  
}

Region.prototype.getState = function() {
  var res = {};
  for(var i in this.playerIds) {
    var pid = this.playerIds[i];
    res[pid] = 10;
  };
  return res;
}

module.exports = Regions;