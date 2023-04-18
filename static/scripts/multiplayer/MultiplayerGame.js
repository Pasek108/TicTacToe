"use strict";

class MultiplayerGame extends Game {
  constructor(mode_id, room_id, player_start_id, maximalize, game_state, switch_sides, socket) {
    super(mode_id, 1, player_start_id, maximalize, ["X", "O"], 3, "alphabeta");

    this.room_id = room_id;
    this.sitch_sides = switch_sides;

    this.game_state = game_state;
    this.loadGameState();
    this.checkIfGameOver(false);

    this.socket = socket;
    this.socket.on("player_move", (data) => {
      this.board.placeMark(data.x, data.y, this.options[this.current_player_id]);
      this.makeMove(data.x, data.y);

      if (this.checkIfGameOver(false)) return false;
      this.showMessage("current_turn");
    });
  }

  playerMove(x, y) {
    if (this.current_player_id != this.player_start_id) return false;
    if (this.is_game_over || this.game_state[x][y] != "") return false;

    const move_info = {
      room: this.room_id,
      player_start_id: this.player_start_id,
      x: x,
      y: y,
    };

    this.socket.emit("move", move_info);
  }

  quit() {
    this.hide();
    lobby.show();
    this.socket.emit("leave_game", this.room_id);
  }

  loadGameState() {
    for (let i = 0; i < this.game_state.length; i++) {
      for (let j = 0; j < this.game_state.length; j++) {
        if (this.game_state[i][j] == "") continue;

        this.board.placeMark(i, j, this.game_state[i][j]);
        this.current_player_id = +!this.current_player_id;
      }
    }
  }
}
