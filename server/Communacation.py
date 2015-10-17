from Game.Managers import ProductsManager

__author__ = 'eduar'


class Communication:
    def __init__(self, game):
        self.game = game

    def getMoney(self):
        return {'money': self.game.world.money}

    def company_change(self, **kwargs):
        ProductsManager.update_company(self.game.world, kwargs)

