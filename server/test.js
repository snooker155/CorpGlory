var myaddon = require("../Game/NodeWrapper/build/Release/GameWrapper.node");

var players = [{name: "Vasya"}, {name: "Petya"}, {name: "Velikiy"}];
var game = myaddon.NewGame(players);

setInterval(function() {
    //console.log(game.gameState());
    game.processAction({action: "team", level: "1", company_name: "PlayerCompany"})
}, 1000);

