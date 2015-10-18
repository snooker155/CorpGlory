__author__ = 'eduar'

class NewsStat:
    def __init__(self):
        self.feedback = []

    def add_feedback(self, user, product, feedback):
        self.feedback.append((user, product, feedback))