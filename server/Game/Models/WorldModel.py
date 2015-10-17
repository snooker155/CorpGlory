from Game.Elements.GameElement import GameElement


class WorldModel:
    def __init__(self, moneyModel, users, average_connections):
        self.moneyModel = moneyModel
        # self.users = UsersGenerator.generate_users(users, average_connections)


def create_world(money=5000, users=100, average_connections=20):
    return WorldModel(money, users, average_connections)
