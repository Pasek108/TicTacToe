"use strict";

function multiplayerClassCreator(mode_id) {
  let subclass;

  switch (mode_id) {
    case 0: subclass = NormalMode; break;
    case 1: subclass = MovableMode; break;
    case 2: subclass = OneMarkMode; break;
  }

  return class extends subclass {
    constructor(mode_id, 
      player_start_id, 
      maximalize, 
      marks, 
      size, 
      switch_sides, 
      room_id, 
      game_state, 
      password, 
      active_players, 
      moves_counter,
      current_player_id, 
      socket) {
      super(mode_id, 1, player_start_id, maximalize, marks, size, switch_sides, "alphabeta");

      this.p1 = this.container.querySelector(".p1");
      this.p2 = this.container.querySelector(".p2");
      this.player_left = this.container.querySelectorAll(".player-left");

      this.replay_button.replaceWith(this.replay_button.cloneNode(true));
      this.replay_button = this.container.querySelector(".replay");
      this.replay_button.addEventListener("click", () => this.socket.emit("restart", room_id));

      this.room_id_container = this.container.querySelector(".room .id");
      this.room_id_container.innerText = room_id;

      this.copied_text = this.container.querySelector(".copied");
      this.invite_player = this.container.querySelector(".invite");
      this.invite_player.addEventListener("click", this.copyLink.bind(this));

      this.room_id = room_id;
      this.switch_sides = switch_sides;
      this.password = password;
      this.moves_counter = moves_counter;
      this.current_player_id = current_player_id;
      if (this.mode_name === "movable") this.moves_left.forEach((moves) => (moves.innerText = `${this.max_moves - this.moves_counter}`));

      this.game_state = game_state;
      this.loadGameState();
      this.checkIfGameOver(false);
      this.markUnactivePlayer(active_players);

      if (this.moves_counter >= 6) {
        const moves = this.availableMoves();
        moves.forEach((move) => this.board.lightUpTile(move[0][0], move[0][1], "#35bc43"));
      }

      this.socket = socket;
      this.socket.on("restart", this.restart.bind(this));
      this.socket.on("room_players_change", this.markUnactivePlayer.bind(this));
      this.socket.on("player_move", (data) => {
        const from = [data.from_x, data.from_y];
        const to = [data.x, data.y];

        if (this.mode_name === "movable" && this.moves_counter >= 6) {
          this.board.placeMark(to[0], to[1], this.options[this.current_player_id]);
          this.board.removeMark(from[0], from[1]);

          this.makeMove(from, to);
          this.moves_left.forEach((moves) => (moves.innerText = `${this.max_moves - this.moves_counter}`));

          this.board.resetLightUps();
          if (this.checkIfGameOver(false)) return;

          const moves = this.availableMoves();
          moves.forEach((move) => this.board.lightUpTile(move[0][0], move[0][1], "#35bc43"));
          this.pickMarkToMove(to[0], to[1]);
          return;
        }

        this.board.placeMark(to[0], to[1], this.options[this.current_player_id]);

        if (this.mode_name !== "movable") this.makeMove(to[0], to[1]);
        else {
          this.makeMove(from, to);
          this.moves_left.forEach((moves) => (moves.innerText = `${this.max_moves - this.moves_counter}`));

          if (this.moves_counter >= 6) {
            const moves = this.availableMoves();
            moves.forEach((move) => this.board.lightUpTile(move[0][0], move[0][1], "#35bc43"));
            this.pickMarkToMove(to[0], to[1]);
          }
        }

        if (this.checkIfGameOver(false)) return false;
        this.showMessage("current_turn");
      });
    }

    copyLink() {
      this.invite_player.style.display = "none";
      this.copied_text.style.display = null;

      navigator.clipboard.writeText(`${location.origin}${location.pathname}?room=${this.room_id}&password=${this.password}`);

      setTimeout(() => {
        this.invite_player.style.display = null;
        this.copied_text.style.display = "none";
      }, 1000);
    }

    markUnactivePlayer(active_players) {
      if (active_players[0]) {
        this.p1.style.color = null;
        this.showMessage("current_turn");
      }

      if (active_players[1]) {
        this.p2.style.color = null;
        this.showMessage("current_turn");
      }

      if (!active_players[0]) {
        this.p1.style.color = "red";
        this.showMessage("no_player");
      }

      if (!active_players[1]) {
        this.p2.style.color = "red";
        this.showMessage("no_player");
      }
    }

    showMessage(type) {
      super.showMessage(type);

      if (type === "no_player") {
        this.messages[3].classList.remove("hidden");
        this.player_left.forEach((player) => (player.innerText = +!this.player_start_id + 1));
      }
    }

    playerMove(x, y) {
      if (this.current_player_id != this.player_start_id) return false;
      if (this.is_game_over) return false;

      if (this.mode_name != "movable" || (this.mode_name === "movable" && this.moves_counter < 6)) {
        if (this.game_state[x][y] != "") return false;

        const move_info = {
          room: this.room_id,
          player_start_id: this.player_start_id,
          x: x,
          y: y,
          from_x: null,
          from_y: null,
        };

        this.socket.emit("move", move_info);
      }

      if (this.mode_name === "movable" && this.moves_counter >= 6) {
        // if picking turn let user pick what to move
        if (this.pick_turn) this.pickMarkToMove(x, y);
        else {
          // move picked mark if its empty tile and one tile away
          const dist_x = Math.abs(x - this.pick[0]);
          const dist_y = Math.abs(y - this.pick[1]);
          if (this.game_state[x][y] === "" && dist_x + dist_y === 1) {
            const move_info = {
              room: this.room_id,
              player_start_id: this.player_start_id,
              x: x,
              y: y,
              from_x: this.pick[0],
              from_y: this.pick[1],
            };

            console.log(move_info)
            this.socket.emit("move", move_info);
          }

          // light up possible picks for player, reset pick and go to picking turn
          this.board.resetLightUps();
          const moves = this.availableMoves();
          moves.forEach((move) => this.board.lightUpTile(move[0][0], move[0][1], "#35bc43"));
          this.pick = [];
          this.pick_turn = !this.pick_turn;
          this.pickMarkToMove(x, y);
        }
      }
    }

    loadGameState() {
      for (let i = 0; i < this.game_state.length; i++) {
        for (let j = 0; j < this.game_state.length; j++) {
          if (this.game_state[i][j] == "") continue;
          this.board.placeMark(i, j, this.game_state[i][j]);
        }
      }
    }

    quit() {
      this.socket.emit("leave_game", this.room_id);
      this.hide();
      lobby.show();
    }

    restart() {
      console.log("dupa")
      this.moves_counter = 0;
      super.restart();
    }

    remove() {
      this.is_game_over = true;
      this.socket.removeAllListeners("restart");
      this.socket.removeAllListeners("room_players_change");
      this.socket.removeAllListeners("player_move");
    }
  };
}
