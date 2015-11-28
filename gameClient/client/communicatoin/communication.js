Communication = {
  open: function() {
    try {
      var socket = io.connect("http://localhost:4000");
      socket.emit('userAction', "my action is hi!");
    } catch (err) {
      Communication.onConnectionLost();
      return;
    }
    socket.on('message', function(msg) {
      var jmsg = JSON.parse(msg);
      if(jmsg.command === 'init') {
        Template.gameScreen.init(jmsg.data);
      }
    });
    socket.on('nextGameState', function(msg) {
      var jmsg = JSON.parse(msg);
      Template.gameScreen.onNextState(jmsg);
    });
  },
  onConnectionLost: function () {
    WindowError.show(
      "Can't connect to the server", "Please reload the page"
    )
  }
};