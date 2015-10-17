from Game.Elements.WorldElement import WorldElement
from Game.Models.WorldModel import WorldModel
from Game.Managers.UserManager import *

__author__ = 'eduar'


def add_product(world, product):
    world.products.append(product)


def create_world(money=5000, users=100, average_connections=20, products=None):
    products = products or ['facebook', 'twitter']

    users = users_tresholders(users_selfishness(users_relations(usergen(users), average_connections)))

    for product in products:
        users = product_generator(users, product)
    users = list(users)
    model = WorldModel(money, users, products)
    return WorldElement(model)
