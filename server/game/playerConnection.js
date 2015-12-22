

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

PlayerConnection.prototype.enterRoom = function(players) {
  var obj = {
    command: 'enterRoom',
    data: players;
  }
  socket.send(JSON.stringify(obj));
}

PlayerConnection.prototype.startGame = function() {
  var obj = {
    command: 'startGame',
    data: {
      players: players,
      regions: Regions
    }
  }
  socket.send(JSON.stringify(obj));
}