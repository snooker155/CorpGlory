from Game.Models.GameElement import GameElement


class World(GameElement):
    def __init__(self):
        self.money = 5000

    def update(self):
        self.money -= 200
