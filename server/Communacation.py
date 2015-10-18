from Game.Managers.NewsManager import NewsManager


class Communication:
    def __init__(self, game):
        self.game = game

    def company_change(self, **kwargs):
        value = kwargs['value']
        self.game.world.model.news = NewsManager.random_news(self.game.world.model,
                                                             [comp.model.product for comp in self.game.world.companies
                                                              if comp.model.name is 'PlayerCompany'][0], value)
