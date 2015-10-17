import random

import numpy as np

from Game.Models.UserModel import Follower, User

__author__ = 'eduar'


def update_product(user):
    if user.ceo:
        return

    max_value = 0.0
    best_prod = None
    for i, prod in enumerate(user.loyalty):
        if user.loyalty[prod] > max_value:
            max_value = user.loyalty[prod]
            best_prod = prod

    if best_prod != None and user.loyalty[best_prod] > user.threshold and user.product != best_prod:
        print(best_prod)
        user.product = best_prod


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


def product_generator(users, product):
    for user in users:
        add_product(user, product)
        yield user


def users_selfishness(generator):
    for user in generator:
        user.selfish = (random.random()) * 0.5
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


def update_inner(user):
    for prod in user.loyalty:
        if user.ceo or user.product == prod or user.loyalty[prod] == 0:
            continue

        solve = (random.random() * 2 - 1.0) * 0.20
        if user.loyalty[prod] + solve < 0:
            user.loyalty[prod] = 0
        elif user.loyalty[prod] + solve > 1:
            user.loyalty[prod] = 1
        else:
            user.loyalty[prod] += solve


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
