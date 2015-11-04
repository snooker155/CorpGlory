var myaddon = require("../Game/NodeWrapper/build/Release/GameWrapper.node");

var game = myaddon.NewGame();

setInterval(function() {
    console.log(game.gameState());
}, 1000);

