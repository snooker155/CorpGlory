
function Player(name) {
  this.name = name;
  this.game = undefined;
}

Player.prototype.enterToGame = function(game) {
  this.game = game;
}

Player.prototype.clickOnRegion = function(regionId) {
  this.game.playerRegionClick(this, regionId);
}

module.exports = Player;