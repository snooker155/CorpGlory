__author__ = 'eduar'

from Game.Managers.UserManager import update_friends
from Game.Elements.GameElement import GameElement

class UserElement(GameElement):
    def __init__(self, user):
        self.usermodel = user

    def update(self):
        update_friends(self.usermodel)
