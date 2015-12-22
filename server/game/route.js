// REQUIRES

const Game = require('./game.js');
const Player = require('./players/player.js');
const BotPlayer = require('./players/botPlayer.js');
const Regions = require('./regions.js');
const PlayerConnection = require('./playerConnection.js');

// GAME CONFIG

const players = [new BotPlayer("BotPlayer1")];
const playerConnections = { };


var io = undefined;


function onUserConnection(socket, name) {
  if(PlayerConnection[name] !== undefined) {
    return false;
  }

  var player = new Player(name);
  players.push(player);
  
  // TODO: remove from PlayerConnections on disconnect
  // via 'on'
  
  for(var pl in playerConnections) {
    console.log(player);
    playerConnections[pl].addPlayer(player);
  }

  var playerConnection = new PlayerConnection(socket, player);
  playerConnection.enterRoom(players);
  playerConnections[name] = playerConnection;
  
  return true;
}

function enterGame() {
  // 
}


function route(app, io) {

  // game
  
  app.get('/game', function(req, res) {
    res.redirect('/game/default');
  });
  
  app.get('/game/(*)', function(req, res) {
    // TODO: check that user exist
    res.render(
      'game', 
      { userName: req.params[0] }
    );
  });

  io.on('connection', function(socket) {
    onUserConnection(socket, socket.handshake.query.name);
  });

}

module.exports = route;