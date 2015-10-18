from collections import defaultdict
from unittest import TestCase
from Game.Elements.UserElement import UserElement
from Game.Managers.CompanyManager import create_company
from Game.Managers.UserManager import users_selfishness, users_relations, usergen, product_generator, ceo_generator
from Game.Managers.WorldManager import create_world, add_company

__author__ = 'eduar'


class TestUserElement(TestCase):
    def test_simple(self):
        facebook, twitter = create_company('facebook', 5000), create_company('twitter', 5000)
        world = create_world(5000, 100, 10, [facebook])

        for i in range(100):
            if i == 10:
                ceo_generator(world.model.users, twitter.product)
                add_company(world, twitter)

            sums = defaultdict(float)
            for user in world.model.users:
                for product in user.choice:
                    sums[product] += (user.product == product)

            line = []
            for prod, sum in sums.items():
                line.append('[{}: {}]'.format(prod, sum))

            print(str(i) + " : " + ' '.join(line))

            world.update()

        self.assertTrue(True)