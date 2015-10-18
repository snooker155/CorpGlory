from collections import defaultdict
from unittest import TestCase
from Game.Elements.UserElement import UserElement
from Game.Managers.CompanyManager import create_company
from Game.Managers.UserManager import users_selfishness, users_relations, usergen, product_generator, ceo_generator

__author__ = 'eduar'


class TestUserElement(TestCase):
    def test_simple(self):
        users = list(users_selfishness(users_relations(usergen(1000), 10)))
        facebook, twitter = create_company('facebook', 5000), create_company('twitter', 5000)

        list(product_generator(users, facebook.product_model))
        ceo_generator(users, facebook.product_model)

        for i in range(100):
            if i == 0:
                list(product_generator(users, twitter.product_model))
                ceo_generator(users, twitter.product_model)

            sums = defaultdict(float)
            for user in users:
                for product in user.choice:
                    sums[product] += (user.product == product)

            line = []
            for prod, sum in sums.items():
                line.append('[{}: {}]'.format(prod, sum))

            print(str(i) + " : " + ' '.join(line))

            for user in users:
                UserElement(user).update()

        self.assertTrue(True)