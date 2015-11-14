from Game.Models.NewsModel import NewsModel
import math

__author__ = 'eduar'

import random

def sign(v):
    if v > 0:
        return 1
    if v < 0:
        return -1
    return 0

class NewsStat:
    def __init__(self):
        self.feedback = []

    def add_feedback(self, user, product, feedback):
        self.feedback.append((user, product, feedback))

    def next_news(self, product):
        our_news = [prod[2] for prod in self.feedback if product == self.feedback[1]]
        # average_feedback = sum(our_news) / len(our_news) if our_news else 0
        average_feedback = random.random() - 0.5
        return NewsModel(product, average_feedback, 0)

    def next_random_news(self, product, change):
        return NewsModel(product, (random.random() / 2) * sign(change), 0)