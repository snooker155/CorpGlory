// REQUIRES
// TODO: move to game manger
const Game = require('./game.js');
const Player = require('./players/player.js');
const BotPlayer = require('./players/botPlayer.js');
// --------------

const PlayerConnection = require('./playerConnection.js');

const _ = require('underscore');

const players = { };
const playerConnections = { };

var io = undefined;

// TODO: move to game manger
function addBotPlayer(name) {
  players[name] = new BotPlayer(name);
}

// TODO: move to game manger
addBotPlayer("BotPlayer1");
addBotPlayer("BotPlayer2");

// TODO: move to game manger
var game = undefined;

// TODO: move to game manger
function onEnterGame() {
  game = new Game(players);
  game.start();
}

// TODO: move to game manger
function onUserDisconnect(playerConnection) {
  var name = playerConnection.player.name;
  if(game === undefined) {
    delete playerConnections[name];
    delete players[name];
  }
  for(var p in playerConnections) {
    playerConnections[p].disconnectPlayer(name);
  }
}

// TODO: move to game manger
function onUserReady(playerConnection) {
  var allIsReady = _.every(playerConnections, function(p) {
    p.readyPlayer(playerConnection.player.name);
    return p.player.ready;
  });
  if(allIsReady) {
    onEnterGame();
  }
}

// TODO: move to game manger
function onUserConnection(socket, name) {
  if(playerConnections[name] !== undefined) {
    return false;
  }

  if (playerConnections[name] !== undefined && game !== undefined) {
    delete playerConnections[name];
    var playerConnection = new PlayerConnection(socket, players[name]);
    playerConnection.on('disconnect', onUserDisconnect);
    playerConnections[name] = playerConnection;
    playerConnections[name].enterGame();
    return;
  }

  var player = new Player(name);
  players[name] = player;
  
  for(var pl in playerConnections) {
    playerConnections[pl].addPlayer(player);
  }

  var playerConnection = new PlayerConnection(socket, player);
  playerConnection.on('disconnect', onUserDisconnect);
  playerConnection.on('ready', onUserReady);
  playerConnection.enterRoom(players);
  playerConnections[name] = playerConnection;
  
  return true;
}

function route(app, io) {  
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