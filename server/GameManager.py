import uuid

class GameManager:

    games = dict()

    @staticmethod
    def generateGameUID():
        return uuid.uuid4()

    @staticmethod
    def gameById(id):
        return GameManager.games[id]

    @staticmethod
    def createNewGame():
        uid = GameManager.generateGameUID()