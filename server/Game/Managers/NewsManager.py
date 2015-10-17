__author__ = 'Bakharev'

class NewsManager:
    news = []

    @staticmethod
    def tick_news(self):
        return NewsManager.news

    @staticmethod
    def add_news(self, current_news):
        news = current_news