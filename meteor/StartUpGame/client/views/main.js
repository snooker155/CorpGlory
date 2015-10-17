var ws = new WebSocket('ws://localhost:8888/');
ws.onmessage = function(event) {
    var world = event.data;
};

function send(command, data) {
  var obj = {
    'command': command,
    'data': data
  };
  ws.send(JSON.stringify(obj));
}

Template.main.events({
  "click #mainButton": function foo() {
    send('getMoney');
  }
});