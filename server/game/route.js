// REQUIRES

const Game = require('./game.js');
const Player = require('./players/player.js');
const BotPlayer = require('./players/botPlayer.js');
const Regions = require('./regions.js');

// GAME CONFIG

var players = [new Player("RealPlayer"), new BotPlayer("Anton"), new BotPlayer("Alexey")];
var game = new Game(players);

function bindGameRoute(app, io) {

  // game
  app.get('/', function(req, res) {
    res.render('game');
  });

  io.on('connection', function(socket) {
    // init player
    var initObj = {
      command: 'init',
      data: {
        players: players,
        regions: Regions
      }
    }
    socket.send(JSON.stringify(initObj));
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
    socket.on('userAction', function(msg) {
      console.log('user action: ' + msg);
    });
  });

  
}

module.exports = bindGameRoute;