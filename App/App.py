__author__ = 'eduar'

from flask import Flask
from collections import defaultdict

app = Flask(__name__)


context = defaultdict(lambda: defaultdict(dict))


@app.route('/<string:login>/', defaults={'path': ''})
@app.route('/<string:login>/<path:path>')
def request(login, path):
    if 'status' not in context[login]:
        context[login]['status'] = 0
    context[login]['status'] += 1

    print(context[login])
    return 'Your request is number: {}'.format(context[login]['status'])

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
