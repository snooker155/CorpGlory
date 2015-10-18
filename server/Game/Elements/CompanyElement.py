from Game.Elements.GameElement import GameElement


class CompanyElement(GameElement):
    def __init__(self, company_model):
        self.model = company_model

    def update(self):
        raise NotImplementedError()


WORLD_USERS = 300

def penalty(users):
    return (3200 / WORLD_USERS) * users if users > 0 else 0

class PlayerCompanyElement(CompanyElement):
    def update(self):
        new_money = self.model.money - (500 - penalty(self.model.product.users))
        print(self.model.name, self.model.money, new_money, self.model.product.users)
        self.model.money = new_money

class AICompanyElement(CompanyElement):
    def update(self):
        new_money = self.model.money - (500 - penalty(self.model.product.users))
        print(self.model.name, self.model.money, new_money, self.model.product.users)
        self.model.money = new_money


