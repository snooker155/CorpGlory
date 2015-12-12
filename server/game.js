const fs = require('fs');

const LOGS_PATH = __dirname + "/logs";

try { fs.lstatSync(LOGS_PATH) } 
catch (e) { fs.mkdirSync(LOGS_PATH); }


const gameNativeModule = require("../Game/NodeWrapper/build/Release/GameWrapper.node");
const Tail = require('always-tail2');
const EventEmitter = require('events').EventEmitter;
const util = require('util');


var coutTail = new Tail(LOGS_PATH + "/cout.txt");
var cerrTail = new Tail(LOGS_PATH + "/cerr.txt");
coutTail.on('line', function(line) { console.log(line); });
cerrTail.on('line', function(line) { console.log(line); });

function Game(players) {
  EventEmitter.call(this);
  for(var p in players) {
    players[p].enterToGame(this);
  }
  this.nGame = gameNativeModule.NewGame(players);
  var self = this;
  setInterval(function() {
    self.emit('nextGameState', self.nGame.gameState());
  }, 1000);
}

util.inherits(Game, EventEmitter);

module.exports = Game;