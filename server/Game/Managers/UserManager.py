import random
import numpy as np
from Game.Models.UserModel import Follower, User


def ceo_generator(users, product):
    while True:
        user = random.choice(users)
        if not user.ceo:
            user.ceo = True
            user.selfish = 1

            for prod in user.choice:
                user.choice[prod] = 0

            user.choice[product] = 1
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


def add_product(user, product):
    user.choice[product] = 0.0


def compute_market_share_for_product(worldModel):
    pass

# ============================================================================ #

def update_inner(user):
    if user.product is not None:
        user.loyalty -= user.loyalty_decrease
        if user.loyalty <= 0:
            user.product = None
            user.loyalty = 0
        return

    for prod in user.choice:
        if user.ceo or user.choice[prod] == 0:
            continue

        user.choice[prod] += np.random.normal()


def update_friends(user):
    if user.product is not None:
        return

    for product in user.choice:
        w = 0
        for friend in user.friends:
            if friend.user.choice[product] > 0:
                w += friend.weight * (0.85 if friend.user.product == product else -0.85)

        a = user.selfish
        user.choice[product] = (a * user.choice[product] + (1 - a) * w)


