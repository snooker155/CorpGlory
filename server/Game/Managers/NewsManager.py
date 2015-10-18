class NewsManager:
    @staticmethod
    def get_news(world_model):
        pass

    @staticmethod
    def on_user_feedback(world_model, user, product, feedback):
        world_model.all_news.add_feeback(user, product, feedback)

    @staticmethod
    def on_product_release(world_model, product, changenotes):
        pass



