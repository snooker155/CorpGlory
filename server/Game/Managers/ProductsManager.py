from Game.Models.ProductModel import ProductModel
from Game.Elements.CompanyElement import PlayerCompanyElement, AICompanyElement

__author__ = 'eduar'


features = {
    'tech_level': 'tech',
    'design_level': 'design',
    'tech_team_level': 'tech_team',
    'market_team_level': 'marketing_team',
    'design_team_level': 'design_team'
}


def update_company(world, change):
    company = [p for p in world.companies if isinstance(p, PlayerCompanyElement)][0]
    feature, value = change['feature'], change['value']
    setattr(company.product, features[feature], value)


def create_company(name, player=False):
    if not hasattr(create_company, 'id'):
        create_company.id = 0
    product = ProductModel(name)

    cls = PlayerCompanyElement if player else AICompanyElement
    company = cls(product)

    company.id = create_company.id
    create_company.id += 1

    return company
