Communication = {
    subscribers: {},
    addSubscriber: function(worldField, handler) {
        if(this.subscribers[worldField] === undefined) {
            this.subscribers[worldField] = [];
        }
        this.subscribers[worldField].push(handler);
    },
    open: function() {
        ws = new WebSocket('ws://localhost:8888/');
        var self = this;
        ws.onmessage = function(event) {
            var world = JSON.parse(event.data)['world'];
            for(var f in world) {
                if(self.subscribers[f + ''] !== undefined) {
                    for(var it in self.subscribers[f + '']) {
                        self.subscribers[f + ''][it](world[f]);
                    }
                }
            }
        }
    },
    send: function (command, data) {
        var obj = {
          'command': command,
          'data': data
        };
        ws.send(JSON.stringify(obj));
    }
};
Communication.open();