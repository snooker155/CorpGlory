import numpy as np
import random

from collections import namedtuple

Follower = namedtuple('Follower', ['user', 'weight'])


class UsersParameters:
    def __init__(self, loyalty):
        self.loyalty = loyalty


class User:
    CEO_ID = 0

    def __init__(self, id, name, loyalty, selfish):
        self.id = id
        self.name = name
        self.friends = []
        self.parameters = UsersParameters(loyalty)
        self.old_parameters = UsersParameters(loyalty)
        self.selfish = selfish

    def update_world(self, world):
        pass

    def update_properties(self):
        self.old_parameters = self.parameters

    @property
    def loyalty(self):
        return self.old_parameters.loyalty

    def is_seo(self):
        return self.id == User.CEO_ID

    def __str__(self):
        return str(self.loyalty)

    def recalc(self):
        w = 0
        for friend in self.friends:
            w += friend.weight * friend.user.loyalty
        w /= len(self.friends)

        a = self.selfish
        self.parameters.loyalty = (a * self.old_parameters.loyalty + (1 - a) * w)


class UsersGenerator:
    WEIGHT_MAX = 1

    @staticmethod
    def generate_users(num, k=10):
        def name():
            return "".join([chr(random.randint(ord('a'), ord('z'))) for _ in range(5)])

        def loyalty():
            return 0

        def selfish():
            return random.random()

        users = [User(0, name(), 1, 1)] + [User(id, name(), loyalty(), selfish()) for id in range(1, num)]
        return UsersGenerator.generate_friendships(users, k)

    @staticmethod
    def generate_friendships(users, k):
        followers_size = np.random.poisson(k, len(users))
        for i, user in enumerate(users):
            followers_indexes = np.random.permutation(len(users))[:followers_size[i]]
            user.friends = [Follower(users[i], random.random() * UsersGenerator.WEIGHT_MAX) for i in followers_indexes]
        return users


users = UsersGenerator.generate_users(100)

for i in range(100):
    print(str(i) + " : " + str(sum(user.loyalty for user in users)))

    for user in users:
        user.recalc()

    for user in users:
        user.update_properties()