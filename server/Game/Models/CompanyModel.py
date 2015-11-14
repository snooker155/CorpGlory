from Game.Managers.ProductsManager import create_product


class CompanyModel:
    def __init__(self, name, money):
        self.name = name
        self.product_model = create_product(self)
        self.money = money

    @property
    def product(self):
        return self.product_model
