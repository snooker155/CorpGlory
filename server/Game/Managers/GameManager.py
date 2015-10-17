
from Game.Game import Game
#game game game :)


class GameManager:
    games = dict()

    @staticmethod
    def game_by_id(id):
        if id not in GameManager.games:
            return None
        return GameManager.games[id]

    @staticmethod
    def start_new_game(id):
        game = Game()
        GameManager.games[id] = game
        game.start()
        return game

    @staticmethod
    def kill_game(id):
        if id in GameManager.games:
            GameManager.games[id].kill()
            del GameManager.games[id]
