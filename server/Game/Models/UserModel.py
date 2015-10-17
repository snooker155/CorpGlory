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

    def add_product(self, product):
        self.loyalty[product] = 0.0

    def update_loyalty(self, product, value):
        self.loyalty[product] += value

    def update_world(self, world):
        pass

    def __str__(self):
        return str(self.loyalty)

    def recalc(self):
        w = 0
        for product in self.loyalty:
            for friend in self.friends:
                w += friend.weight * friend.user.loyalty[product]
            w /= len(self.friends)

            a = self.selfish
            self.loyalty[product] = (a * self.loyalty[product] + (1 - a) * w)