ws = new WebSocket('ws://localhost:8888/');

send = function (command, data) {
	  var obj = {
	    'command': command,
	    'data': data
	  };
	  ws.send(JSON.stringify(obj));
	}