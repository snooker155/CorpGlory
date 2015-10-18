from collections import namedtuple, defaultdict

Follower = namedtuple('Follower', ['user', 'weight'])


class User:
    def __init__(self, id, name):
        self.id = id
        self.name = name

        self.ceo = False
        self.product = None

        self.threshold = 0.5
        self.selfish = 0

        self.loyalty = 0
        self.loyalty_decrease = 20

        self.friends = []
        self.choice = defaultdict(float)

    def __str__(self):
        return str(self.choice)