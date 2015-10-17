__author__ = 'eduar'

from Game.Managers.UserManager import *
from Game.Elements.GameElement import GameElement


class UserElement(GameElement):
    def __init__(self, user):
        self.user_model = user

    def update(self):
        update_friends(self.user_model)
        update_relation_coefficient(self.user_model)

        update_news(self.user_model)
        update_news_coefficient(self.user_model)

        update_inary(self.user_model)
        update_products(self.user_model)