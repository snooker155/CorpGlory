from Game.Managers import NewsManager

__author__ = 'eduard'

from Game.Managers.UserManager import *
from Game.Managers.NewsManager import NewsManager
from Game.Elements.GameElement import GameElement


class UserElement(GameElement):
    def __init__(self, user):
        self.user_model = user

    def update(self):
        update_friends(self.user_model)
        update_relation_coefficient(self.user_model)

        update_news(self.user_model, NewsManager.news)
        update_news_coefficient(self.user_model)

        update_inary(self.user_model)
        update_products(self.user_model)
