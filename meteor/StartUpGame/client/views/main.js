var money = new ReactiveVar (1);

var ws = new WebSocket('ws://localhost:8888/');
ws.onmessage = function(event) {
  money.set(event.data);
};

function send(command, data) {
  var obj = {
    'command': command,
    'data': data
  };
  ws.send(JSON.stringify(obj));
}


Template.main.helpers({
	money: function () {
		return money.get();
	}
});

Template.main.events({
  "click #mainButton": function foo() {
    send('getMoney');
  }
});