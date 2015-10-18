from Game.Models.NewsModel import NewsModel

__author__ = 'eduar'

import random


class NewsStat:
    def __init__(self):
        self.feedback = []

    def add_feedback(self, user, product, feedback):
        self.feedback.append((user, product, feedback))

    def next_news(self, product):
        our_news = [prod[2] for prod in self.feedback if product == self.feedback[1]]
        average_feedback = sum(our_news) / len(our_news)
        average_feedback = (average_feedback + random.random()) * 0.5
        return NewsModel(product, average_feedback, 0)