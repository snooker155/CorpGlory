from Game.Elements.GameElement import GameElement


class WorldElement(GameElement):
    def __init__(self, money, users, average_connections):
        self.money = money
        # self.users = UsersGenerator.generate_users(users, average_connections)

    def update(self):
        self.money -= 200

        # for user in self.users:
        #     user.recalc()
        #
        # for user in self.users:
        #     user.update_properties()


def create_world(money=5000, users=100, average_connections=20):
    return WorldElement(money, users, average_connections)
