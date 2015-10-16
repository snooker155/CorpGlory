__author__ = 'eduar'

import numpy as np
import random

from collections import namedtuple

Follower = namedtuple('Follower', ['user', 'weight'])

class User():
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.friends = []

    def update_env(self, env):
        pass

    def __str__(self):
        return self.name + "\n" + " ".join([friend.user.name for friend in self.friends])


class UsersGenerator():
    WEIGHT_MAX = 10

    @staticmethod
    def generate_users(num, k=10):
        def gen_name():
            return "".join([chr(random.randint(ord('a'), ord('z'))) for _ in range(5)])

        users = [User(id, gen_name()) for id in range(num)]
        return UsersGenerator.generate_friendships(users, k)

    @staticmethod
    def generate_friendships(users, k):
        followers_size = np.random.poisson(k, len(users))
        for i, user in enumerate(users):
            followers_indexes = np.random.permutation(len(users))[:followers_size[i]]
            user.friends = [Follower(users[i], random.random() * UsersGenerator.WEIGHT_MAX) for i in followers_indexes]
        return users

# users = UsersGenerator.generate_users(100)
# print(users[5].friends)