import random

class NewsManager:
    @staticmethod
    def get_news(world_model):
        news_gen = world_model.all_news
        company = random.choice(world_model.companies)
        return news_gen.next_news(company.product)

    @staticmethod
    def random_news(world_model, product, change):
        return world_model.all_news.next_random_news(product, change)

    @staticmethod
    def on_user_feedback(world_model, user, product, feedback):
        world_model.all_news.add_feedback(user, product, feedback)

    @staticmethod
    def on_product_release(world_model, product, changenotes):
        pass



