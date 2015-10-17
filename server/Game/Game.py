from threading import Thread, Lock
from time import sleep
from Models import World.World

class Game:
    def __init__(self):
        self.world = World()
        # -----------------
        self.thread = None
        self.killed = False
        self.lock = Lock()

    def public_getMoney(self):
        return {'money': self.money}

    def public_goDaddy(self):
        pass

    def update(self):
        # TODO: move to the World game element
        self.world.money -= 200

    # ========================

    def lockAll(self):
        self.lock.acquire()

    def unlockAll(self):
        self.lock.release()

    def start(self):
        self.thread = Thread(target=self.updateLoop)
        self.thread.start()
        pass

    def updateLoop(self):
        while True:
            if self.killed:
                return
            self.lockAll()
            self.update()
            self.unlockAll()
            # TODO: notify connected client about the update
            sleep(1)

    def kill(self):
        self.killed = True
        self.thread.join()
        pass
