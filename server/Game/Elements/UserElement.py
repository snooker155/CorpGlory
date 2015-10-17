__author__ = 'eduar'

from Game.Managers.UserManager import update_friends, update_inner, update_product
from Game.Elements.GameElement import GameElement

class UserElement(GameElement):
    def __init__(self, user):
        self.usermodel = user

    def update(self):
        update_inner(self.usermodel)
        update_friends(self.usermodel)
        update_product(self.usermodel)
