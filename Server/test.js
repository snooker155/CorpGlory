var myaddon = require("../Game/NodeWrapper/build/Release/GameWrapper.node");

var players = [123, 536, 234];
var game = myaddon.NewGame(players);

setInterval(function() {
    console.log(game.gameState());
}, 1000);

