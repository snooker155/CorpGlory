// Run this when the meteor app is started
Meteor.startup(function () {

	var ws = new WebSocket('ws://10.25.2.190:8888/');
    ws.onopen = function() {
        ws.send("hi!");
    };
    ws.onmessage = function(message, data) {
        alert(message.data);
    }

});