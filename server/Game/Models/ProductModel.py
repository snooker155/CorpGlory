__author__ = 'eduar'


class Product:
    def __init__(self, name):
        self.name = name
        self.ux = 0
        self.feature = 0
        self.social = 0

    def __str__(self):
        return self.name
