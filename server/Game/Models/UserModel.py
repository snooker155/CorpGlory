from collections import namedtuple, defaultdict
from enum import Enum

Follower = namedtuple('Follower', ['user', 'weight'])


class User:
    def __init__(self, id, name):
        self.id = id
        self.friends = []

        self.product = None
        self.threshold = 0.0
        self.selfish = 0
        self.loyalty = defaultdict(float)

        self.ceo = False
        self.name = name

    def __str__(self):
        return str(self.loyalty)


# class Liberal(Enum):
#     conservative = 0
#     liberal = 1