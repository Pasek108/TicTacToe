class Game:
    def __init__(self, room_id, mode_id, type_id, starting_id, size, options, password, switch_sides, player_sid):
        self.room_id = room_id
        self.mode_id = mode_id
        self.type_id = type_id
        self.size = size
        self.password = password
        self.switch_sides = switch_sides

        self.players = ["", ""]
        self.players[starting_id] = player_sid
        self.game_state = [[""] * size for j in range(size)]
        self.options = options
        self.current_player_id = 0
        self.moves_counter = 0
        self.game_over = False

    def get_room_info(self):
        return {
            "room_id": self.room_id,
            "mode_id": self.mode_id,
            "type_id": self.type_id,
            "options": self.options,
            "free_spaces": self.players.count(""),
            "size": self.size,
            "protected": self.password != ""
        }

    def get_game_info(self, player_sid):
        return {
            "room_id": self.room_id,
            "mode_id": self.mode_id,
            "type_id": self.type_id,
            "options": self.options,
            "player_id": self.players.index(player_sid) if player_sid in self.players else -1,
            "size": self.size,
            "switch_sides": self.switch_sides,
            "game_state": self.game_state,
            "password": self.password,
            "active_players": [self.players[0] != "", self.players[1] != ""],
            "moves_counter": self.moves_counter,
            "current_player_id": self.current_player_id
        }

    def get_active_players(self):
        return [self.players[0] != "", self.players[1] != ""]

    def restart(self, player_sid):
        if player_sid not in self.players:
            return False

        if self.switch_sides:
            self.players[0], self.players[1] = self.players[1], self.players[0]

        self.game_state = [[""] * self.size for j in range(self.size)]
        self.current_player_id = 0
        self.moves_counter = 0
        self.game_over = False

        return True

    def player_leave(self, player_sid):
        self.players[self.players.index(player_sid)] = ""

        if self.players[0] == "" and self.players[1] == "":
            return False

        return True

    def player_join(self, player_sid, password):
        if "" not in self.players or password != self.password:
            return False

        self.players[self.players.index("")] = player_sid
        return True

    def player_move(self, x, y, player_id, from_x, from_y):
        if self.game_over or self.game_state[x][y] != "" or self.current_player_id != player_id:
            return False

        if self.mode_id == 1 and self.moves_counter >= 6:
            if abs(x - from_x) + abs(y - from_y) != 1:
                return False

            self.game_state[from_x][from_y] = ""

        self.game_state[x][y] = self.options[self.current_player_id]
        self.current_player_id = (self.current_player_id + 1) % 2
        self.moves_counter += 1

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
