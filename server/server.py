from tornado import websocket, web, ioloop
from Tools.Serialization import serialize
import json
from GameManager import GameManager


class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def connection_id(self):
        return self.request.headers['Sec-Websocket-Key']

    def open(self):
        game = GameManager.start_new_game(self.connection_id())
        game.on_update = lambda: self.on_update(game)
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
                print('on_message')
                self.write_message(res)
        finally:
            game.unlockAll()

    def on_update(self, game):
        print('on_update')
        print(serialize(game.world))
        self.write_message(serialize(game.world))

    def on_close(self):
        id = self.connection_id()
        GameManager.kill_game(id)


app = web.Application([(r'/', SocketHandler)])

if __name__ == '__main__':
    app.listen(8888)
    ioloop.IOLoop.instance().start()
