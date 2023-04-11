class Game:
    def __init__(self, size):
        self.size = size
        self.game_state = [[""]*size for j in range(size)]
        self.options = ["X", "Y"]
        self.current_option = 0
        self.game_over = False

    def player_move(self, x, y):
        if self.game_over:
            return

        self.game_state[x][y] = self.options[self.current_option]
        self.current_option = (self.current_option + 1) % 2

        if self.check_win():
            self.game_over = True

    def check_win(self):
        if self.check_rows():
            return True
        if self.check_cols():
            return True
        if self.check_diagonals():
            return True
        if self.check_draw():
            return True

        return False

    def check_rows(self):
        for i in range(self.size):
            are_the_same = True

            if self.game_state[i][0] == "":
                continue

            for j in range(1, self.size):
                if self.game_state[i][0] != self.game_state[i][j]:
                    are_the_same = False
                    break

            if are_the_same:
                return True

        return False

    def check_cols(self):
        for i in range(self.size):
            are_the_same = True

            if self.game_state[0][i] == "":
                continue

            for j in range(1, self.size):
                if self.game_state[0][i] != self.game_state[j][i]:
                    are_the_same = False
                    break

            if are_the_same:
                return True

        return False

    def check_diagonals(self):
        for i in range(2):
            are_the_same = True

            if self.game_state[i * (self.size - 1)][0] == "":
                continue

            for j in range(1, self.size):
                if self.game_state[i * (self.size - 1)][0] != self.game_state[j + i * (self.size - 1 - 2 * j)][j]:
                    are_the_same = False
                    break

            if are_the_same:
                return True

        return False

    def check_draw(self):
        for row in self.game_state:
            for tile in row:
                if tile == "":
                    return False

        return True

