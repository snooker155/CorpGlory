class NewsModel:
    def __init__(self, product, value):
        self.product = product
        self.value = value

    def __str__(self):
        return "{} {}".format(self.product, self.value)