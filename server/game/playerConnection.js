
// TODO: inherit from Player ? 

function PlayerConnection(socket, player) {
  this.socket = socket;
  
  // init player
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('userAction', function(msg) {
    // TODO: reafactor userAction -> to handler
    const jmsg = JSON.parse(msg);
    
    // enter
    if(jmsg.action === "roomEnter") {
      if(!onEnterGame(jmsg.data.name)) {
        res.status(403).send("Can't login with username " + jmsg.data.name);
      } else {
        
      }
    
    }

    console.log('user action: ' + msg);
  });
}

PlayerConnection.prototype.sendObj = function(commandName, data) {
  var obj = {
    command: commandName,
    data: data
  }
  this.socket.send(JSON.stringify(obj));
}

PlayerConnection.prototype.enterRoom = function(players) {
  this.sendObj('enterRoom', players);
}

PlayerConnection.prototype.addPlayer = function(player) {
  this.sendObj('addPlayer', player);
}

PlayerConnection.prototype.startGame = function(gameInit) {
  this.sendObj('enterGame', gameInit);
}

module.exports = PlayerConnection;