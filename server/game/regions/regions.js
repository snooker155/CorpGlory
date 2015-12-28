
const Region = require('./region.js');

var Regions = function(playerIds) {
  for(var i in Regions.NAMES) {
    var r = Regions.NAMES[i];
    this[r] = new Region(playerIds);
  }
}

Regions.NAMES = ['EU', 'AS', 'OC', 'AF', 'SA', 'NA'];

Regions.prototype.forRegion = function(f) {
  for(var i in Regions.NAMES) {
    var name = Regions.NAMES[i];
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

module.exports = Regions;