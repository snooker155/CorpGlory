var myaddon = require("../Game/NodeWrapper/build/Release/GameWrapper.node"),
    http = require('http');

var players = [{name: "Vasya"}, {name: "Petya"}, {name: "Velikiy"}];
var game = myaddon.NewGame(players);


http.createServer(function(req, res) {
  var textRes = processRequest(req);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(textRes);
}).listen(3000, "127.0.0.1");
console.log("Server running at http://blb;ba");

//setInterval(function() { й
//  console.log(game.gameState());
//}, 1000);
