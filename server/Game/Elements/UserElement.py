from Game.Managers.NewsManager import NewsManager
from Game.Managers.UserManager import update_friends, update_inner, update_product, update_news
from Game.Elements.GameElement import GameElement


class UserElement(GameElement):
    def __init__(self, user):
        self.user_model = user

    def update(self):
        update_inner(self.user_model)
        update_friends(self.user_model)
        update_product(self.user_model)

    def help_news(self, world_model):
        for product, value in self.user_model.choice.items():
            NewsManager.on_user_feedback(world_model, self, product, value)

    def update_news(self, news):
        update_news(self.user_model, news)
        update_product(self.user_model)
