from tornado import websocket, web, ioloop
import json
from GameManager import GameManager


class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def connection_id(self):
        return self.request.headers['Sec-Websocket-Key']

    def open(self):
        game = GameManager.start_new_game(self.connection_id())
        game.onUpdate = lambda: self.onUpdate(game)
        self.write_message(json.dumps({'ok': 'ok'}))

    def on_message(self, data):
        obj = json.loads(data)
        game = GameManager.game_by_id(self.connection_id())
        command = obj['command']
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

    def onUpdate(self, game):
        # possible race condition
        self.write_message(game.world.__dict__)

    def on_close(self):
        id = self.connection_id()
        GameManager.kill_game(id)


app = web.Application([(r'/', SocketHandler)])

if __name__ == '__main__':
    app.listen(8888)
    ioloop.IOLoop.instance().start()
