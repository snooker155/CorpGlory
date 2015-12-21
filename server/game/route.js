// REQUIRES

const Game = require('./game.js');
const Player = require('./players/player.js');
const BotPlayer = require('./players/botPlayer.js');


// GAME CONFIG

function createGame() {
  var players = [new Player("RealPlayer"), new BotPlayer("Anton"), new BotPlayer("Alexey")];
  var game = new Game(players);
}


function bindGameRoute(app, io) {
  
  // game
  app.get('/game', function(req, res) {
    var host = req.get('host');
    var language = 'en';
    if(host.indexOf(".ru") != -1) {
      language = 'ru';
    }
    renderBasic(res, 'game');
  });
  
  // -----------------------
  io.on('connection', function(socket) {
    
    // init player
    var initObj = {
      command: 'init',
      data: players
    }
    socket.send(JSON.stringify(initObj));
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
    socket.on('userAction', function(msg) {
      console.log('user action: ' + msg);
    });
  });

  game.on('nextGameState', function(state) {
    io.emit('nextGameState', state);
  });
  
}

module.exports = bindGameRoute;