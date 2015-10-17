class NewsManager:
    news = []

    @staticmethod
    def get_news():
        return NewsManager.news

    @staticmethod
    def add_news(current_news):
        NewsManager.news = current_news
