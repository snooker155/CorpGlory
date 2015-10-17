
from tornado import websocket, web, ioloop
import json
from GameManager import GameManager

class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def connectionId(self):
        return self.request.headers['Sec-Websocket-Key']

    def open(self):
        GameManager.startNewGame(self.connectionId())
        self.write_message(json.dumps({'ok': 'ok'}))

    def on_message(self, data):
        obj = json.loads(data)
        command = obj['command']
        game = GameManager.gameById(self.connectionId())
        mt = getattr(game, 'public_' + command)
        game.lockAll()
        try:
            if 'data' in obj:
                res = mt(obj['data'])
            else:
                res = mt()
            if res is not None:
                self.write_message(json.dumps(res))
        finally:
            game.unlockAll()

    def on_close(self):
        id = self.connectionId()
        GameManager.killGame(id)

app = web.Application([(r'/', SocketHandler)])

if __name__ == '__main__':
    app.listen(8888)
    ioloop.IOLoop.instance().start()