Communication = {
  open: function() {
    var socket = io.connect("http://localhost:4000");
    socket.emit('userAction', "my action is hi!");
    socket.on('nextGameState', function(msg){
      if(Communication.onNextState !== undefined) {
        var jmsg = JSON.parse(msg);
        Communication.onNextState(jmsg);
      }
    });
  },
  onNextState: undefined
};
$(function() {
  Communication.open();
});