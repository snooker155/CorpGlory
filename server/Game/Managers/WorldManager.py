from Game.Elements.WorldElement import WorldElement
from Game.Managers.CompanyManager import create_company
from Game.Models.WorldModel import WorldModel
from Game.Managers.UserManager import usergen, users_relations, users_selfishness, product_generator, ceo_generator

__author__ = 'eduar'


def add_product(world, product):
    world.products.append(product)


def create_world(money=5000, users=100, average_connections=20, companies=None):
    companies = companies or [create_company('facebook', money), create_company('twitter', money),
                              create_company('MyCompany', money)]
    users = list(users_selfishness(users_relations(usergen(users), average_connections)))

    for company in companies:
        list(product_generator(users, company.product))
        ceo_generator(users, company.product)

    model = WorldModel(users, companies)
    return WorldElement(model)
