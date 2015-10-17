from threading import Thread, Lock
from time import sleep

from Communacation import Communication
from Game.Managers.WorldManager import create_world
from Tools.Serialization import serialize


class Game:
    def __init__(self):
        self.world = create_world()
        self.communication = Communication(self)

        self.on_update = None
        # -----------------
        self.thread = None
        self.killed = False
        self.lock = Lock()

    def update(self):
        self.world.update()

    # ========================

    def lockAll(self):
        self.lock.acquire()

    def unlockAll(self):
        self.lock.release()

    def start(self):
        self.thread = Thread(target=self.updateLoop)
        self.thread.start()

    def updateLoop(self):
        while True:
            if self.killed:
                return

            self.lockAll()
            self.update()
            self.unlockAll()
            if self.on_update is not None:
                self.on_update()
            sleep(1)

    def kill(self):
        self.killed = True
        self.thread.join()