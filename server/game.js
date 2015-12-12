var gameNativeModule = require("../Game/NodeWrapper/build/Release/GameWrapper.node");
var Tail = require('always-tail2');
var EventEmitter = require('events').EventEmitter;
const util = require('util');

var coutTail = new Tail(__dirname + "/logs/cout.txt");
var cerrTail = new Tail(__dirname + "/logs/cerr.txt");
coutTail.on('line', function(line) { console.log(line); });
cerrTail.on('line', function(line) { console.log(line); });

function Game(players) {
  EventEmitter.call(this);
  this.nGame = gameNativeModule.NewGame(players);
  var self = this;
  setInterval(function() {
    self.emit('nextGameState', self.nGame.gameState());
  }, 1000);
}

util.inherits(Game, EventEmitter);

module.exports = Game;