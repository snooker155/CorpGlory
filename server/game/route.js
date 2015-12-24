// REQUIRES

const Game = require('./game.js');
const Player = require('./players/player.js');
const BotPlayer = require('./players/botPlayer.js');
const Regions = require('./regions.js');
const PlayerConnection = require('./playerConnection.js');

const _ = require('underscore');

const players = { };
const playerConnections = { };

var io = undefined;

function addBotPlayer(name) {
  players[name] = new BotPlayer(name);
}

addBotPlayer("BotPlayer1");
addBotPlayer("BotPlayer2");

var game = undefined;

function onEnterGame() {
  game = new Game(players);
  game.start();
}

function onUserDisconnect(playerConnection) {
  var name = playerConnection.player.name;
  delete playerConnections[name];
  delete players[name];
  for(var p in playerConnections) {
    playerConnections[p].disconnectPlayer(name);
  }
}

function onUserReady(playerConnection) {
  var allIsReady = _.every(playerConnections, function(p) {
    p.readyPlayer(playerConnection.player.name);
    return playerConnection.player.ready;
  });
  if(allIsReady) {
    onEnterGame();
  }
}

function onUserConnection(socket, name) {
  if(PlayerConnection[name] !== undefined) {
    return false;
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