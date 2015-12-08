from Game.Models.ProductModel import ProductModel
from Game.Elements.CompanyElement import PlayerCompanyElement


features = {
    'tech_level': 'tech',
    'design_level': 'design',
    'tech_team_level': 'tech_team',
    'market_team_level': 'marketing_team',
    'design_team_level': 'design_team'
}


def create_product(company):
    return ProductModel(company)


def update_company(world, change):
    company = [p for p in world.companies if isinstance(p, PlayerCompanyElement)][0]
    feature, value = change['feature'], change['value']
    setattr(company.product, features[feature], value)