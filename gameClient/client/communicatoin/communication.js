Communication = {
  open: function() {
    try {
      this.socket = io.connect("http://" + location.hostname + ":4000");
    } catch (err) {
      Communication.onConnectionLost();
      return;
    }
    this.socket.on('message', function(msg) {
      var jmsg = JSON.parse(msg);
      if(jmsg.command === 'init') {
        Template.gameScreen.init(jmsg.data);
      }
    });
    this.socket.on('nextGameState', function(msg) {
      var jmsg = JSON.parse(msg);
      Template.gameScreen.onNextState(jmsg);
    });
  },
  userAction: function(action, data) {
    var resObj = {
      action: action,
      data: data
    };
    this.socket.emit('userAction', JSON.stringify(resObj));
  },
  onConnectionLost: function () {
    WindowError.show(
      "Can't connect to the server", "Please reload the page"
    )
  }
};