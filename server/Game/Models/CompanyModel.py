from Game.Models.ProductModel import ProductModel


class CompanyModel:
    def __init__(self, name):
        self.name = name
        self.product_model = ProductModel(self)

