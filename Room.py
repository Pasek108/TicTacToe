from Game import Game


class Room:
    def __init__(self, name, mode):
        self.name = name
        self.mode = mode
        self.players = 0

        if mode == "normal":
            self.game = Game(3)
        if mode == "movable":
            self.game = Game(3)
        if mode == "one_mark":
            self.game = Game(4)
