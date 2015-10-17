from Game.Elements.CompanyElement import CompanyElement
from Game.Elements.GameElement import GameElement
from Game.Elements.UserElement import UserElement
from Game.Managers.ProductsManager import create_company
from Game.Models.WorldModel import WorldModel


class WorldElement(GameElement):
    def __init__(self, world_model: WorldModel):
        self.world_model = world_model
        self.users = [UserElement(user) for user in self.world_model.users]
        self.companies = [create_company(company) for company in self.world_model.products]
        self.companies.append(create_company('MyCompany', player=True))

    def update(self):
        self.world_model.money_model -= 200

        for user in self.users:
            user.update()

        for company in self.companies:
            company.update()

    @property
    def model(self):
        return self.world_model
