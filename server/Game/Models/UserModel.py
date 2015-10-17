from collections import namedtuple, defaultdict
from enum import Enum

Follower = namedtuple('Follower', ['user', 'weight'])


class UserCoefficient:
    def __init__(self):
        self.c1 = 1.0  # weight friends
        self.c2 = 1.0  # weight news
        self.c3 = 1.0  # weight inner info

        #        self.delta = 0.0
        self.alpha = 0.5
        self.threshold = 0.0
        self.news_relation = 0
        self.selfish = 0


class User:
    def __init__(self, id, name):
        self.id = id
        self.friends = []
        self.ceo = False
        self.product = None
        self.coefficients = UserCoefficient()
        self.threshold = 0.0
        self.selfish = 0
        self.loyalty = defaultdict(float)
        self.news_history = []

    def __str__(self):
        return str(self.loyalty)


class New:
    def __init__(self, product, value):
        self.product = product
        self.value = value
