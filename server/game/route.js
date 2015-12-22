// REQUIRES

const Game = require('./game.js');
const Player = require('./players/player.js');
const BotPlayer = require('./players/botPlayer.js');
const Regions = require('./regions.js');
const PlayerConnection = require('./playerConnection.js');

// GAME CONFIG

const players = [];
const playerConnections = { };


function onUserConnection(socket, name) {
  if(PlayerConnection[name] !== undefined) {
    return false;
  }
  players = new Player(name);
  playerConnections[name] = new PlayerConnection(socket, player);
  // TODO: remove from PlayerConnections on disconnect
  // via 'on'
  return true;
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