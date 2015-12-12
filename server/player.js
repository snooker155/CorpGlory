
function Player(name) {
  this.name = name;
  this.game = undefined;
}

Player.prototype.enterToGame = function(game) {
  this.game = game;
}

module.exports = Player;