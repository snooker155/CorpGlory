__author__ = 'eduar'

from flask import Flask
from collections import defaultdict
app = Flask(__name__)


context = defaultdict(dict)


@app.route('/<string:login>/', defaults={'path': ''})
@app.route('/<string:login>/<path:path>')
def request(login, path):
    print(login, path)
    return path

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
