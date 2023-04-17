class Game:
    def __init__(self, id, mode_id, type_id, starting_id, size, password, switch_sides, player_sid):
        self.id = id
        self.mode_id = mode_id
        self.type_id = type_id
        self.starting_id = starting_id
        self.size = size
        self.password = password
        self.switch_sides = switch_sides

        self.players = ["", ""]
        self.players[self.starting_id] = player_sid
        self.game_state = [[""]*size for j in range(size)]
        self.options = ["X", "O"]
        self.current_player_id = 0
        self.game_over = False

    def get_game_info(self, player_sid):
        return {
            "id": self.id,
            "mode_id": self.mode_id,
            "type_id": self.type_id,
            "player_id": self.players.index(player_sid) if player_sid in self.players else -1,
            "free_spaces": self.players.count(""),
            "size": self.size,
            "password": self.password,
            "switch_sides": self.switch_sides,
            "game_state": self.game_state
        }

    def player_leave(self, player_sid):
        self.players[self.players.index(player_sid)] = ""

        if self.players[0] == "" and self.players[1] == "":
            return False

        return True

    def player_join(self, player_sid):
        if "" not in self.players:
            return False

        self.players[self.players.index("")] = player_sid
        return True

    def player_move(self, x, y, player_id):
        if self.game_over or self.game_state[x][y] != "" or self.current_player_id != player_id:
            return False

        self.game_state[x][y] = self.options[self.current_player_id]
        self.current_player_id = (self.current_player_id + 1) % 2

        if self.check_win():
            self.game_over = True

        return True

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

