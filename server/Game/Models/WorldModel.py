class WorldModel:
    def __init__(self, users, companies, all_news):
        self.companies = companies
        self.users = users
        self.news = None

        self.all_news = all_news

