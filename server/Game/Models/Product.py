__author__ = 'eduar'

from Game.Models.GameElement import GameElement


def create_product(name):
    if not hasattr(create_product, 'id'):
        create_product.id = 0
    product = Product(name)

    product.id = create_product.id
    create_product.id += 1

    return product


class Product(GameElement):
    def __init__(self, name):
        self.name = name
        self.ux = 0
        self.feature = 0
        self.social = 0

    def __str__(self):
        return self.name

    def update(self):
        pass