from collections import defaultdict
import random
from Game.Managers.ProductsManager import create_product
from Game.Models.UserModel import Follower, User
import numpy as np

__author__ = 'eduar'


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


def update_friends(user):
    w = 0
    for product in user.loyalty:
        for friend in user.friends:
            w += friend.weight * friend.user.loyalty[product]
        w /= len(user.friends)

        a = user.selfish
        user.loyalty[product] = (a * user.loyalty[product] + (1 - a) * w)


def add_product(user, product):
    user.loyalty[product] = 0.0


def update_loyalty(user, product, value):
    user.loyalty[product] += value
