from collections import defaultdict
from unittest import TestCase
from Game.Elements.UserElement import UserElement
from Game.Managers.ProductsManager import create_company
from Game.Managers.UserManager import users_selfishness, users_relations, usergen, product_generator, ceo_generator, \
    users_tresholders

__author__ = 'eduar'


class TestUserElement(TestCase):
    def test_simple(self):
        users = list(users_tresholders(users_selfishness(users_relations(usergen(100), 10))))

        facebook, twitter = create_company('facebook'), create_company('twitter')

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
                line.append('[{}: {}]'.format(prod.product.name, sum))

            print(str(i) + " : " + ' '.join(line))

            for user in users:
                UserElement(user).update()


        self.assertTrue(True)
