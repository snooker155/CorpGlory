__author__ = 'eduar'

from abc import ABCMeta, abstractmethod


class GameElement(metaclass=ABCMeta):
    @abstractmethod
    def update(self):
        pass