from Game.Elements.GameElement import GameElement


class CompanyElement(GameElement):
    def __init__(self, company_model):
        self.company_model = company_model

    def update(self):
        raise NotImplementedError()


class PlayerCompanyElement(CompanyElement):
    def update(self):
        self.company_model.money -= 10


class AICompanyElement(CompanyElement):
    def update(self):
        self.company_model.money -= 10

