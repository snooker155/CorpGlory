__author__ = 'eduar'


class ProductModel:
    def __init__(self, company):
        self.name = company.name
        self.company = company

        self.tech = 0
        self.design = 0

        self.tech_team = 0
        self.marketing_team = 0
        self.design_team = 0
        self.market_share = 0

    def __str__(self):
        return self.name
