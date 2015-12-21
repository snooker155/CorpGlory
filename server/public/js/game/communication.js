Communication = { };

Communication.open = function() {
  try {
    this.socket = io.connect("http://" + location.hostname + ":4000");
  } catch (err) {
    Communication.onConnectionLost();
    return;
  }
  this.socket.on('message', function(msg) {
    var jmsg = JSON.parse(msg);
    if(jmsg.command === 'init') {
      GameScreen.init(jmsg.data);
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
