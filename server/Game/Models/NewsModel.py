class NewsModel:
    def __init__(self, product, value, time):
        self.time = time

        # 1) Release, 2) Paper - note in newspaper, 3) Finance news - reports (have number in it)
        # 4) Feedback news, 5) Warning - crush

        self.product = product
        self.value = value

    def __str__(self):
        return "{} {}".format(self.product, self.value)


class ReleaseNews(NewsModel):
    pass


class PaperNews(NewsModel):
    pass


class FinanceNews(NewsModel):
    pass


class FeedbackNews(NewsModel):
    pass


class WarningNews(NewsModel):
    pass
