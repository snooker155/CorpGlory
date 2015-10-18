from Game.Models.CompanyModel import CompanyModel


def create_company(name, money):
    if not hasattr(create_company, 'id'):
        create_company.id = 0

    company = CompanyModel(name, money)

    company.id = create_company.id
    create_company.id += 1

    return company
