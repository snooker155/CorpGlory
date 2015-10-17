import random
from collections import namedtuple, defaultdict
from Game.Models.Product import create_product

import numpy as np

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


def ceo_generator(users, product):
    while True:
        user = random.choice(users)

        if not user.ceo:
            user.ceo = True
            user.selfish = 1

            for prod in user.loyalty:
                user.loyalty[prod] = 0

            user.loyalty[product] = 1
            user.product = product
            return user


def product_generator(generator, product):
    for user in generator:
        user.add_product(product)
        yield product


def users_selfishness(generator):
    for user in generator:
        user.selfish = (random.random() + 1) * 0.5
        yield user


def users_relations(generator, k):
    weight_max = 1

    users = list(generator)
    followers_size = np.random.poisson(k, len(users))
    for i, user in enumerate(users):
        followers_indexes = np.random.permutation(len(users))[:followers_size[i]]
        user.friends = [Follower(users[j], random.random() * weight_max) for j in followers_indexes]
    yield from users


def usergen(num):
    def name():
        return "".join([chr(random.randint(ord('a'), ord('z'))) for _ in range(5)])

    yield from (User(id, name()) for id in range(1, num))


if __name__ == '__main__':
    users = list(users_selfishness(users_relations(usergen(100), 10)))
    facebook, twitter = create_product('facebook'), create_product('twitter')

    product_generator(users, facebook)
    ceo_generator(users, facebook)

    for i in range(100):
        if i == 10:
            product_generator(users, twitter)
            ceo_generator(users, twitter)

        sums = defaultdict(float)
        for user in users:
            for product in user.loyalty:
                sums[product] += user.loyalty[product]

        line = []
        for prod, sum in sorted(sums.items(), key=lambda x: x[0].id):
            line.append('[{}: {}]'.format(prod, sum))

        print(str(i) + " : " + ' '.join(line))

        for user in users:
            user.recalc()
