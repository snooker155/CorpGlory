from Game.Elements.CompanyElement import PlayerCompanyElement, AICompanyElement
from Game.Elements.GameElement import GameElement
from Game.Elements.UserElement import UserElement
from Game.Managers.CompanyManager import create_company
from Game.Models.WorldModel import WorldModel


class WorldElement(GameElement):
    def __init__(self, model: WorldModel):
        self.model = model
        self.users = [UserElement(userModel) for userModel in self.model.users]
        self.companies = [AICompanyElement(company_model) for company_model in self.model.companies]
        self.companies.append(PlayerCompanyElement(create_company('MyCompany')))

    def update(self):
        self.model.money_model -= 200

        for user in self.users:
            user.update()

        for company in self.companies:
            company.update()

