from Game.Managers.UserManager import update_friends, update_inner, update_product
from Game.Elements.GameElement import GameElement


class UserElement(GameElement):
    def __init__(self, user):
        self.user_model = user

    def update(self):
        update_inner(self.user_model)
        update_friends(self.user_model)
        update_product(self.user_model)
