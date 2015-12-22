Communication = { };

Communication.open = function() {
  try {
    this.socket = io.connect('', { query: 'name=' + USER_NAME });
  } catch (err) {
    Communication.onConnectionLost();
    return;
  }
  this.socket.on('message', function(msg) {
    var jmsg = JSON.parse(msg);
    var data = jmsg.data;
    if(jmsg.command === 'enterRoom') {
      App.onEnterRoom(data);
    }
    if(jmsg.command === 'addPlayer') {
      App.onAddPlayer(data);
    }
    if(jmsg.command === 'enterGame') {
      App.onEnterGame(data);
    }
    
  });
  this.socket.on('nextGameState', function(msg) {
    var jmsg = JSON.parse(msg);
    GameScreen.onNextState(jmsg);
  });
}

Communication.userAction = function(action, data) {
  var resObj = {
    action: action,
    data: data
  };
  this.socket.emit('userAction', JSON.stringify(resObj));
}

Communication.onConnectionLost = function () {
  WindowError.show(
    "Can't connect to the server", "Please reload the page"
  )
}
