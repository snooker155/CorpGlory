from Game.Models.CompanyModel import CompanyModel

__author__ = 'alexeyvelikiy'


def create_company(name, money):
    if not hasattr(create_company, 'id'):
        create_company.id = 0

    company = CompanyModel(name, money)

    company.id = create_company.id
    create_company.id += 1

    return company