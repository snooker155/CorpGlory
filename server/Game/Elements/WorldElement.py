from Game.Elements.CompanyElement import PlayerCompanyElement, AICompanyElement
from Game.Elements.GameElement import GameElement
from Game.Elements.UserElement import UserElement
from Game.Managers.CompanyManager import create_company
from Game.Managers.NewsManager import NewsManager
from Game.Models.WorldModel import WorldModel


class WorldElement(GameElement):
    NEWS_GENERATION_INTERVAL = 5
    def __init__(self, model: WorldModel):
        self.update_ticks = 0
        self.model = model
        self.users = [UserElement(userModel) for userModel in self.model.users]

        # last is ours....
        self.companies = [PlayerCompanyElement(self.model.companies[0])]
        self.companies.extend([AICompanyElement(company_model) for company_model in self.model.companies[1:]])

    def add_company(self, company):
        self.companies.append(AICompanyElement(company))
        self.model.companies.append(company)

    def update(self):
        self.update_ticks += 1

        if self.companies[0].model.money <= 0:
            self.model.game_over = True

        for user in self.users:
            user.update()
            user.help_news(self.model)

        for company in self.companies:
            company.update()

        if not self.update_ticks % WorldElement.NEWS_GENERATION_INTERVAL:
            news = NewsManager.get_news(self.model)
            self.model.news = news
            print('News generated: {}, {}'.format(news.product.name, news.value))
            for user in self.users:
                user.update_news(self.model.news)


