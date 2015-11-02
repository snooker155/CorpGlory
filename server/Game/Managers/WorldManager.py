from Game.Elements.CompanyElement import AICompanyElement
from Game.Elements.WorldElement import WorldElement
from Game.Managers.CompanyManager import create_company
from Game.Models.NewsStat import NewsStat
from Game.Models.WorldModel import WorldModel
from Game.Managers.UserManager import usergen, users_relations, users_selfishness, product_generator, ceo_generator


def add_company(world, company):
    world.add_company(company)


def create_world(money=50000, users=300, average_connections=20, companies=None):
    companies = companies or [
        create_company('PlayerCompany', money),  # my company is always first
        create_company('facebook', money),
        create_company('twitter', money)
    ]

    users = list(users_selfishness(users_relations(usergen(users), average_connections)))

    for company in companies:
        list(product_generator(users, company.product))
        ceo_generator(users, company.product)

    all_news = NewsStat()

    model = WorldModel(users, companies, all_news)
    return WorldElement(model)
