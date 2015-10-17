var ws = new WebSocket('ws://10.25.2.190:8888/');
ws.onmessage = function(event) {
  alert(event.data)
}


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