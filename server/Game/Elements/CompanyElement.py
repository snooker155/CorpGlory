from Game.Elements.GameElement import GameElement

__author__ = 'eduar'


class CompanyElement(GameElement):
    def __init__(self, company_model):
        self.company_model = company_model

    def update(self):
        raise NotImplementedError()


class PlayerCompanyElement(CompanyElement):
    def update(self):
        print('Update PlayerCompany')


class AICompanyElement(CompanyElement):
    def update(self):
        print('Update AICompany')

