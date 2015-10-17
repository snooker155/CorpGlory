var money = new ReactiveVar (1);

var ws = new WebSocket('ws://localhost:8888/');
ws.onmessage = function(event) {
<<<<<<< HEAD
  money.set(event.data);
=======
    var world = event.data;
>>>>>>> e1de1c6eae0bcc61602a66cf81fe0b09e4d5eae4
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