from collections import namedtuple, defaultdict
from enum import Enum

Follower = namedtuple('Follower', ['user', 'weight'])


class User:
    def __init__(self, id, name):
        self.id = id
        self.ceo = False
        self.product = None
        self.name = name
        self.liberal = Liberal.conservative
        self.friends = []
        self.selfish = 0
        self.loyalty = defaultdict(float)

    def __str__(self):
        return str(self.loyalty)


class Liberal(Enum):
    conservative = 0
    liberal = 1
