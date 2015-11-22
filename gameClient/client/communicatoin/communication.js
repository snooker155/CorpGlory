Communication = {
  open: function() {
    try {
      var socket = io.connect("http://localhost:4000");
      socket.emit('userAction', "my action is hi!");
    } catch (err) {
      if(Communication.onConnectionLost !== undefined) {
        Communication.onConnectionLost();
      }
      return;
    }
    socket.on('nextGameState', function(msg){
      if(Communication.onNextState !== undefined) {
        var jmsg = JSON.parse(msg);
        Communication.onNextState(jmsg);
      }
    });
  },
  onNextState: undefined,
  onConnectionLost: function () {
    WindowError.show(
      "Can't connect to the server", "Please reload the page"
    )
  }
};
$(function() {
  Communication.open();
});