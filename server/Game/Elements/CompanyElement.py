from Game.Elements.GameElement import GameElement

__author__ = 'eduar'


class CompanyElement(GameElement):
    def __init__(self, product_model):
        self.product = product_model


class PlayerCompanyElement(CompanyElement):
    def update(self):
        print('Update PlayerCompany', self.product.tech)


class AICompanyElement(CompanyElement):
    def update(self):
        print('Update AICompany', self.product.tech)

