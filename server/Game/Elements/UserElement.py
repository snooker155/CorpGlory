from Game.Managers.UserManager import update_friends, update_inner
from Game.Elements.GameElement import GameElement
import random


class UserElement(GameElement):
    def __init__(self, user):
        self.user_model = user

    def update(self):
        update_inner(self.user_model)
        update_friends(self.user_model)
        self.update_product()

    def update_product(self):
        if self.user_model.ceo:
            return

        max_value = 0.0
        best_prod = None
        for i, prod in enumerate(self.user_model.choice):
            if self.user_model.choice[prod] > max_value:
                max_value = self.user_model.choice[prod]
                best_prod = prod

        if best_prod is not None and self.user_model.choice[best_prod] > self.user_model.threshold and self.user_model.product != best_prod:
            self.user_model.product = best_prod
            best_prod.company.money += int(100 * random.random())
            
