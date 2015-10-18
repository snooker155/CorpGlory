from Game.Managers.NewsManager import NewsManager
from Game.Managers.UserManager import update_friends, update_inner, update_news
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

        if best_prod is not None \
                and self.user_model.choice[best_prod] > self.user_model.threshold \
                and self.user_model.product is not best_prod:
            
            if self.user_model.product: 
                print(self.user_model.product.name, best_prod.name)
            
            if self.user_model.product:
                self.user_model.product.users -= 1
            best_prod.users += 1

            self.user_model.product = best_prod
            self.user_model.loyalty = self.user_model.max_loyalty

    def help_news(self, world_model):
        for product, value in self.user_model.choice.items():
            NewsManager.on_user_feedback(world_model, self, product, value)

    def update_news(self, news):
        update_news(self.user_model, news)
