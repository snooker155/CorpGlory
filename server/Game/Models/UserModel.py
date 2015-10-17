from collections import namedtuple, defaultdict

Follower = namedtuple('Follower', ['user', 'weight'])


class User:
    def __init__(self, id, name):
        self.id = id
        self.ceo = False
        self.product = None
        self.name = name
        self.friends = []
        self.selfish = 0
        self.loyalty = defaultdict(float)

    def __str__(self):
        return str(self.loyalty)
