import numpy as np
import random

from collections import namedtuple

Follower = namedtuple('Follower', ['user', 'weight'])


class UsersParameters:
    def __init__(self, loyalty):
        self.loyalty = loyalty


class User:
    def __init__(self, id, name, loyalty):
        self.id = id
        self.name = name
        self.friends = []
        self.parameters = UsersParameters(loyalty)
        self.old_parameters = UsersParameters(loyalty)

    def update_world(self, world):
        pass

    def update_properties(self):
        self.old_parameters = self.parameters

    @property
    def loyalty(self):
        return self.old_parameters.loyalty

    def __str__(self):
        return str(self.loyalty)
        # res = "{} {}\n".format(self.name, self.loyalty)
        # for friend in self.friends:
        #     res += str(friend.weight) + " " + str(friend.user.loyalty) + ", "
        # return res


    # TODO bakharevk: a * self + (1 - a) * other
    def recalc(self):
        def change(w):
            if self.id == 0:
                self.parameters.loyalty = 1
            else:
                self.parameters.loyalty = (self.old_parameters.loyalty + w) * 0.5

        w = 0
        for friend in self.friends:
            w += friend.weight * friend.user.loyalty
        w /= len(self.friends)

        change(w)


class UsersGenerator:
    WEIGHT_MAX = 1
    LOYALTY_MAX = 2

    @staticmethod
    def generate_users(num, k=10):
        def name():
            return "".join([chr(random.randint(ord('a'), ord('z'))) for _ in range(5)])

        def loyalty(id):
            return 0 if id > 0 else 1
            # return random.random() * UsersGenerator.LOYALTY_MAX - 1.0

        users = [User(id, name(), loyalty(id)) for id in range(num)]
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

    # print(" ".join(str(user) for user in users))
    # print()