
from Game.Game import Game
#game game game :)


class GameManager:
    games = dict()

    @staticmethod
    def gameById(id):
        if id not in GameManager.games:
            return None
        return GameManager.games[id]

    @staticmethod
    def startNewGame(id):
        game = Game()
        GameManager.games[id] = game
        game.start()

    @staticmethod
    def killGame(id):
        if(id in GameManager.games):
            GameManager.games[id].kill()
            del GameManager.games[id]
