from threading import Thread, Lock
from time import sleep
from Game.Managers.WorldManager import create_world
from Game.Managers import ProductsManager
from Tools.Serialization import serialize


class Game:
    def __init__(self):
        self.world = create_world()
        self.onUpdate = None
        # -----------------
        self.thread = None
        self.killed = False
        self.lock = Lock()

    def public_getMoney(self):
        return {'money': self.world.money}

    def public_company_change(self, change):
        ProductsManager.update_company(self.world, change)

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
        pass

    def updateLoop(self):
        while True:
            if self.killed:
                return

            self.lockAll()
            self.update()
            self.unlockAll()
            if self.onUpdate is not None:
                self.onUpdate()
            sleep(1)
            print(serialize(self.world.model))

    def kill(self):
        self.killed = True
        self.thread.join()
        pass
