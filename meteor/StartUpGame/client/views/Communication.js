Communication = {
    subscribers: {},
    // use the Meteor Session 
    addSubscriber: function(worldField, handler) {
        if(this.subscribers[worldField] === undefined) {
            this.subscribers[worldField] = [];
        }
        this.subscribers[worldField].push(handler);
    },
    webSocket: null,
    open: function() {
        var self = this;
        this.webSocket = new WebSocket('ws://localhost:8888/');
        this.webSocket.onmessage = function(event) {
            var world = JSON.parse(event.data)['world'];
            Session.set('world', world);
            for(var f in world) {
                if(self.subscribers[f + ''] !== undefined) {
                    for(var it in self.subscribers[f + '']) {
                        self.subscribers[f + ''][it](world[f]);
                    }
                }
            }
        };
        
    },
    send: function (command, data) {
        var obj = {
          'command': command,
          'data': data
        };
        this.webSocket.send(JSON.stringify(obj));
    }
};
Communication.open();