from Game.Elements.GameElement import GameElement
from Game.Models.CompanyModel import CompanyModel

__author__ = 'eduar'


class CompanyElement(GameElement):
    def __init__(self, company_model: CompanyModel):
        self.company_model = company_model

    def update(self):
        raise NotImplementedError()


class PlayerCompanyElement(CompanyElement):
    def update(self):
        print('Update PlayerCompany')


class AICompanyElement(CompanyElement):
    def update(self):
        print('Update AICompany')

