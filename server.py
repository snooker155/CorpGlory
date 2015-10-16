from tornado import websocket, web, ioloop

class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print("open!")
        self.write_message("hihih!")

    def on_message(self, data):
        print(data)

    def on_close(self):
        print("close")

app = web.Application([
    (r'/', SocketHandler),
])

if __name__ == '__main__':
    app.listen(8888)
    ioloop.IOLoop.instance().start()