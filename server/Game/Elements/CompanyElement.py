from Game.Elements.GameElement import GameElement


class CompanyElement(GameElement):
    def __init__(self, company_model):
        self.model = company_model

    def update(self):
        raise NotImplementedError()


class PlayerCompanyElement(CompanyElement):
    def update(self):
        self.model.money -= 10


class AICompanyElement(CompanyElement):
    def update(self):
        self.model.money -= 10

