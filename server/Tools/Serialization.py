__author__ = 'eduar'
import json


def serialize(obj, **kwargs):
    def walk(obj):
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

    return json.dumps(walk(obj), **kwargs).encode()
