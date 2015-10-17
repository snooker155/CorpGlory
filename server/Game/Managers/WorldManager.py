from Game.Elements.WorldElement import WorldElement
from Game.Models.ProductModel import ProductModel
from Game.Models.WorldModel import WorldModel
from Game.Managers.UserManager import usergen, users_relations, users_selfishness

__author__ = 'eduar'


def add_product(world, product):
    world.products.append(product)


def create_world(money=5000, users=100, average_connections=20, products=None):
    products = products or ['facebook', 'twitter']
    users = users_selfishness(users_relations(usergen(users), average_connections))
    model = WorldModel(money, users, products)
    return WorldElement(model)