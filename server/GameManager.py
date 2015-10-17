
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
    def createNewGame(id):
        GameManager.games[id] = Game()
        pass

    @staticmethod
    def killGame(id):
        if(id in GameManager.games):
            del GameManager.games[id]
