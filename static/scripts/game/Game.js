"use strict";

class Game {
  constructor(mode_id, versus_id, player_start_id, maximalize, options, size, enemy_algorithm) {
    this.container = document.querySelector(".game");

    this.quit_button = this.container.querySelector(".quit");
    this.quit_button.replaceWith(this.quit_button.cloneNode(true));
    this.quit_button = this.container.querySelector(".quit");
    this.quit_button.addEventListener("click", this.quit.bind(this));

    this.replay_button = this.container.querySelector(".replay");
    this.replay_button.replaceWith(this.replay_button.cloneNode(true));
    this.replay_button = this.container.querySelector(".replay");
    this.replay_button.addEventListener("click", this.restart.bind(this));

    // messages containers
    this.messages = this.container.querySelectorAll("h2 .message");
    this.player_turn = this.container.querySelectorAll(".player-turn");
    this.player_win = this.container.querySelectorAll(".player-win");

    this.mode_id = mode_id;
    this.is_computer_an_enemy = versus_id === 0;
    this.player_start_id = player_start_id;
    this.maximalize = maximalize;
    this.options = options;
    this.size = size;

    this.computer_enemy = new ComputerEnemy(enemy_algorithm, maximalize);
    this.board = new Board(size, this.playerMove.bind(this));
    this.moves_history = [];
    this.is_game_over = false;
    this.current_player_id = 0;

    this.initGameState();
    this.loadGameInfo();
    this.showMessage("current_turn");
    this.show();
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
  }

  loadGameInfo() {
    // load mark of player 1
    this.p1_mark = this.container.querySelector(".p1-mark");
    this.p1_mark.innerText = this.options[0];

    // load mark of player 2
    this.p2_mark = this.container.querySelector(".p2-mark");
    this.p2_mark.innerText = this.options[1];

    // load starting player
    this.player_start = this.container.querySelector(".player-start");
    this.player_start.innerText = `P${this.player_start_id + 1}`;

    // load mode name
    this.mode_names = this.container.querySelectorAll(".mode-name");
    this.mode_names.forEach((mode) => mode.classList.add("hidden"));
    this.mode_names[this.mode_id].classList.remove("hidden");

    // load mode type
    this.type_names = this.container.querySelectorAll(".type-name");
    this.type_names.forEach((type) => type.classList.add("hidden"));
    this.type_names[+!this.maximalize].classList.remove("hidden");
  }

  showMessage(type) {
    this.messages.forEach((message) => message.classList.add("hidden"));

    switch (type) {
      case "current_turn": {
        this.messages[0].classList.remove("hidden");
        this.player_turn.forEach((player) => (player.innerText = this.current_player_id + 1));
      } break;

      case "winner": {
        this.messages[1].classList.remove("hidden");
        this.player_win.forEach((player) => (player.innerText = +(this.maximalize ? !this.current_player_id : this.current_player_id) + 1));
      } break;

      case "draw": this.messages[2].classList.remove("hidden"); break;
    }
  }

  quit() {
    this.hide();
    menu.show();
  }

  initGameState() {
    this.game_state = [];

    for (let i = 0; i < this.size; i++) {
      this.game_state.push([]);
      for (let j = 0; j < this.size; j++) this.game_state[i].push("");
    }
  }

  restart() {
    this.initGameState();
    this.board = new Board(this.size, this.playerMove.bind(this));
    this.replay_button.disabled = true;

    this.moves_history = [];
    this.is_game_over = false;
    this.current_player_id = 0;

    this.showMessage("current_turn");
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove();
  }

  playerMove(x, y) {
    if (this.is_computer_an_enemy && this.player_start_id != this.current_player_id) return false;
    if (this.is_game_over || this.game_state[x][y] != "") return false;

    this.board.placeMark(x, y, this.options[this.current_player_id]);
    this.makeMove(x, y);
    if (this.checkIfGameOver(false)) return false;

    this.showMessage("current_turn");
    if (this.is_computer_an_enemy) this.computerMove();

    return true;
  }

  computerMove() {
    const move = this.computer_enemy.calculateMove(this);

    setTimeout(() => {
      this.board.placeMark(move[0], move[1], this.options[this.current_player_id]);
      this.makeMove(move[0], move[1]);

      if (this.checkIfGameOver(false)) return;

      this.showMessage("current_turn");
    }, 500);
  }

  makeMove(x, y) {
    this.moves_history.push([x, y]);
    this.game_state[x][y] = this.options[this.current_player_id];
    this.current_player_id = +!this.current_player_id;
  }

  back() {
    const last_action = this.moves_history.pop();
    this.game_state[last_action[0]][last_action[1]] = "";
    this.current_player_id = +!this.current_player_id;

    return last_action;
  }

  availableMoves() {
    let moves = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.game_state[i][j] === "") moves.push([i, j]);
      }
    }

    return moves;
  }

  checkIfGameOver(only_result = true) {
    /* --------- check if game ends in row --------- */
    const win_row_id = this.winnerRowId();

    if (win_row_id >= 0) {
      if (!only_result) {
        this.board.drawHorizontalStroke(win_row_id);
        this.showMessage("winner");
        this.gameOver();
      }
      return true;
    }

    /* --------- check if game ends in column --------- */
    const win_col_id = this.winnerColumnId();

    if (win_col_id >= 0) {
      if (!only_result) {
        this.board.drawVerticalStroke(win_col_id);
        this.showMessage("winner");
        this.gameOver();
      }
      return true;
    }

    /* --------- check if game ends in diagonal --------- */
    const win_diag_id = this.winnerDiagonalId();

    if (win_diag_id >= 0) {
      if (!only_result) {
        this.board.drawDiagonalStroke(win_diag_id);
        this.showMessage("winner");
        this.gameOver();
      }
      return true;
    }

    /* --------- check if there are possible moves --------- */
    if (this.availableMoves().length === 0) {
      if (!only_result) {
        this.showMessage("draw");
        this.gameOver();
      }
      return true;
    }

    return false;
  }

  winnerRowId() {
    for (let i = 0; i < this.size; i++) {
      if (this.game_state[i][0] == "") continue;

      let are_the_same = true;

      for (let j = 1; j < this.size; j++) {
        if (this.game_state[i][0] != this.game_state[i][j]) {
          are_the_same = false;
          break;
        }
      }

      if (are_the_same) return i;
    }

    return -1;
  }

  winnerColumnId() {
    for (let i = 0; i < this.size; i++) {
      if (this.game_state[0][i] == "") continue;

      let are_the_same = true;

      for (let j = 1; j < this.size; j++) {
        if (this.game_state[0][i] != this.game_state[j][i]) {
          are_the_same = false;
          break;
        }
      }

      if (are_the_same) return i;
    }

    return -1;
  }

  winnerDiagonalId() {
    for (let i = 0; i < 2; i++) {
      if (this.game_state[i * (this.size - 1)][0] == "") continue;

      let are_the_same = true;

      for (let j = 1; j < this.size; j++) {
        if (this.game_state[i * (this.size - 1)][0] != this.game_state[j + i * (this.size - 1 - 2 * j)][j]) {
          are_the_same = false;
          break;
        }
      }

      if (are_the_same) return i;
    }

    return -1;
  }

  gameOver() {
    this.board.block();
    this.is_game_over = true;
    this.replay_button.disabled = false;
  }

  result() {
    const last_action = this.moves_history[this.moves_history.length - 1];

    const win_row_id = this.winnerRowId();
    if (win_row_id >= 0) {
      if (this.isWonByStartingPlayer(win_row_id, 0)) return [-1, last_action];
      else return [1, last_action];
    }

    const win_col_id = this.winnerColumnId();
    if (win_col_id >= 0) {
      if (this.isWonByStartingPlayer(0, win_col_id)) return [-1, last_action];
      else return [1, last_action];
    }

    const win_diag_id = this.winnerDiagonalId();
    if (win_diag_id >= 0) {
      if (this.isWonByStartingPlayer(win_diag_id * 2, 0)) return [-1, last_action];
      else return [1, last_action];
    }

    return [0, last_action];
  }

  isWonByStartingPlayer(x, y) {
    return this.game_state[x][y] == this.options[this.player_start_id];
  }
}
