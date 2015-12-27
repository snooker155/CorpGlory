const NAMES = ['EU', 'AS', 'OC', 'AF', 'SA', 'NA'];

var Regions = function(playerIds) {
  for(var i in NAMES) {
    var r = NAMES[i];
    this[r] = new Region(playerIds);
  }
}

Regions.prototype.forRegion = function(f) {
  for(var i in NAMES) {
    var name = NAMES[i];
    var region = this[name];
    f(name, region);
  }
}

Regions.prototype.update = function() {
  this.forRegion((n, r) => r.update());
}

Regions.prototype.getInit = function() {
  var res = {};
  this.forRegion((n, r) => {
    res[n] = {};
  });
  return res;
}
 
Regions.prototype.getState = function() {  
  var res = {};
  this.forRegion((n, r) => { 
    res[n] = r.getState();
  });
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