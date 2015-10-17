from collections import defaultdict
from Game.Models.CompanyModel import CompanyModel
from Game.Models.ProductModel import ProductModel
from Game.Models.UserModel import User
import json

__author__ = 'eduar'


def walk_user(user):
    data = user.__dict__.copy()
    data['friends'] = [d.user.id for d in data['friends']]
    return data


def walk_product(product):
    data = product.__dict__.copy()
    del data['company']


def walk(obj):
    if isinstance(obj, User):
        return walk_user(obj)
    if isinstance(obj, ProductModel):
        return walk_product(obj)
    if isinstance(obj, (bool, int, float, str)):
        return obj
    elif isinstance(obj, dict):
        obj = obj.copy()
        for key in obj:
            obj[key] = walk(obj[key])
        return obj
    elif isinstance(obj, list):
        return [walk(item) for item in obj]
    elif isinstance(obj, tuple):
        return tuple(walk([item for item in obj]))
    elif hasattr(obj, '__dict__'):
        return walk(obj.__dict__)
    else:
        return repr(obj)  # Don't know how to handle, convert to string


def serialize(obj, key=None, **kwargs):
    if key:
        obj = {key: obj}
    j = walk(obj)
    return json.dumps(j, **kwargs).encode()
