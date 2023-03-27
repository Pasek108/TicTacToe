"use strict";

class Game {
  constructor(versus_id, maximalize) {
    this.container = document.querySelector(".game");
    this.message_container = this.container.querySelector(".message");
    this.versus_id = versus_id;
    this.maximalize = maximalize;

    this.history = [];
    this.game_end = false;
    
    this.options = ["X", "O"];
    this.start_option = 0;
    this.current_option = this.start_option;
    
    this.message_container.innerText = `Kolej gracza ${this.options[this.current_option]}`;
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
  }

  initGameState() {
    this.game_state = [];

    for (let i = 0; i < this.size; i++) {
      this.game_state.push([]);
      for (let j = 0; j < this.size; j++) this.game_state[i].push("");
    }
  }

  playerMove(x, y) {
    if (this.versus_id == 0 && this.start_option != this.current_option) return;
    if (this.game_state[x][y] != "") return;

    this.board.placeMark(x, y, this.options[this.current_option]);
    this.makeMove(x, y);
    if(this.checkIfGameOver(false)) return;

    this.message_container.innerText = `Kolej gracza ${this.options[this.current_option]}`;
    if (this.versus_id == 0) this.computerMove();
  }

  computerMove() {
    const ai_move_positions = this.computer_enemy.calculateMove(this, this.maximalize);
    
    setTimeout(() => {
      this.board.placeMark(ai_move_positions[0], ai_move_positions[1], this.options[this.current_option]);
      this.makeMove(ai_move_positions[0], ai_move_positions[1]);
      if(this.checkIfGameOver(false)) return;

      this.message_container.innerText = `Kolej gracza ${this.options[this.current_option]}`;
    }, 400);
  }

  makeMove(x, y) {
    this.history.push([x, y]);
    this.game_state[x][y] = this.options[this.current_option];
    this.current_option = +!this.current_option;
  }

  back() {
    const last_action = this.history.pop();
    this.game_state[last_action[0]][last_action[1]] = "";
    this.current_option = +!this.current_option;

    return last_action;
  }

  result() {
    const last_action = this.history[this.history.length - 1];

    const win_row_id = this.winnerRowId();
    if (win_row_id >= 0) {
      if (this.game_state[win_row_id][0] == this.options[this.start_option]) return [-1, last_action];
      else return [1, last_action];
    }

    const win_col_id = this.winnerColumnId();
    if (win_col_id >= 0) {
      if (this.game_state[0][win_col_id] == this.options[this.start_option]) return [-1, last_action];
      else return [1, last_action];
    }

    const win_diag_id = this.winnerDiagonalId();
    if (win_diag_id >= 0) {
      if (this.game_state[win_diag_id * 2][0] == this.options[this.start_option]) return [-1, last_action];
      else return [1, last_action];
    }

    return [0, last_action];
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
        if (!this.maximalize) this.current_option = +!this.current_option;
        this.gameOver(`Wygrał gracz ${this.options[+!this.current_option]}`);
      }
      return true;
    }

    /* --------- check if game ends in column --------- */
    const win_col_id = this.winnerColumnId();

    if (win_col_id >= 0) {
      if (!only_result) {
        this.board.drawVerticalStroke(win_col_id);
        if (!this.maximalize) this.current_option = +!this.current_option;
        this.gameOver(`Wygrał gracz ${this.options[+!this.current_option]}`);
      }
      return true;
    }

    /* --------- check if game ends in diagonal --------- */
    const win_diag_id = this.winnerDiagonalId();

    if (win_diag_id >= 0) {
      if (!only_result) {
        this.board.drawDiagonalStroke(win_diag_id);
        if (!this.maximalize) this.current_option = +!this.current_option;
        this.gameOver(`Wygrał gracz ${this.options[+!this.current_option]}`);
      }
      return true;
    }

    /* --------- check if there are possible moves --------- */
    if (this.availableMoves().length === 0) {
      if (!only_result) this.gameOver("Remis");
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

  gameOver(message) {
    this.message_container.innerText = message;
    this.board.block();
    this.game_end = true;
  }
}

class Standard extends Game {
  constructor(versus_id, player1_starts, maximalize) {
    super(versus_id, maximalize);

    if (this.versus_id == 0) this.computer_enemy = new ComputerEnemy("alfabeta", maximalize);
    this.size = 3;
    this.board = new Board(this.size, this.playerMove.bind(this));
    this.initGameState();

    this.show();

    if (!player1_starts) {
      if (this.versus_id == 0) {
        this.start_option = 1;
        this.computerMove();
      }
    }
  }
}

class Other1 extends Game {
  constructor(versus_id, player1_starts, maximalize) {
    super(versus_id, maximalize);

    if (this.versus_id == 0) this.computer_enemy = new ComputerEnemy("alfabeta", maximalize);
    this.size = 3;
    this.board = new Board(this.size, this.playerMove.bind(this));
    this.initGameState();

    this.show();

    if (!player1_starts) {
      if (this.versus_id == 0) {
        this.start_option = 1;
        this.computerMove();
      }
    }
  }

  playerMove(x, y) {
    super.playerMove(x, y);
    if (this.availableMoves().length <= 3) this.board.lightUpMarks(this.options[this.current_option]);
  }
}

class Other2 extends Game {
  constructor(versus_id, player1_starts, maximalize) {
    super(versus_id, maximalize);

    if (this.versus_id == 0) this.computer_enemy = new ComputerEnemy("modified_alfabeta", maximalize);
    this.options = ["X", "X"];
    this.size = 4;
    this.board = new Board(this.size, this.playerMove.bind(this));
    this.initGameState();

    this.show();

    if (!player1_starts) {
      if (this.versus_id == 0) {
        this.start_option = 1;
        this.computerMove();
      }
    }

    this.message_container.innerText = `Kolej gracza ${this.current_option + 1}`;
  }

  result() {
    const last_action = this.history[this.history.length - 1];

    const win_row_id = this.winnerRowId();
    if (win_row_id >= 0) {
      if (this.start_option != this.current_option) return [-1, last_action];
      else return [1, last_action];
    }

    const win_col_id = this.winnerColumnId();
    if (win_col_id >= 0) {
      if (this.start_option != this.current_option) return [-1, last_action];
      else return [1, last_action];
    }

    const win_diag_id = this.winnerDiagonalId();
    if (win_diag_id >= 0) {
      if (this.start_option != this.current_option) return [-1, last_action];
      else return [1, last_action];
    }

    return [0, last_action];
  }

  playerMove(x, y) {
    if (this.versus_id == 0 && this.start_option != this.current_option) return;
    if (this.game_state[x][y] != "") return;

    this.board.placeMark(x, y, this.options[this.current_option]);
    this.makeMove(x, y);
    if(this.checkIfGameOver(false)) return;

    this.message_container.innerText = `Kolej gracza ${this.current_option + 1}`;
    if (this.versus_id == 0) this.computerMove();
  }

  computerMove() {
    const ai_move_positions = this.computer_enemy.calculateMove(this, this.maximalize);
    
    setTimeout(() => {
      this.board.placeMark(ai_move_positions[0], ai_move_positions[1], this.options[this.current_option]);
      this.makeMove(ai_move_positions[0], ai_move_positions[1]);
      if(this.checkIfGameOver(false)) return;

      this.message_container.innerText = `Kolej gracza ${this.current_option + 1}`;
    }, 400);
  }

  checkIfGameOver(only_result = true) {
    /* --------- check if game ends in row --------- */
    const win_row_id = this.winnerRowId();

    if (win_row_id >= 0) {
      if (!only_result) {
        this.board.drawHorizontalStroke(win_row_id);
        if (!this.maximalize) this.current_option = +!this.current_option;
        this.gameOver(`Wygrał gracz ${+!this.current_option + 1}`);
      }
      return true;
    }

    /* --------- check if game ends in column --------- */
    const win_col_id = this.winnerColumnId();

    if (win_col_id >= 0) {
      if (!only_result) {
        this.board.drawVerticalStroke(win_col_id);
        if (!this.maximalize) this.current_option = +!this.current_option;
        this.gameOver(`Wygrał gracz ${+!this.current_option + 1}`);
      }
      return true;
    }

    /* --------- check if game ends in diagonal --------- */
    const win_diag_id = this.winnerDiagonalId();

    if (win_diag_id >= 0) {
      if (!only_result) {
        this.board.drawDiagonalStroke(win_diag_id);
        if (!this.maximalize) this.current_option = +!this.current_option;
        this.gameOver(`Wygrał gracz ${+!this.current_option + 1}`);
      }
      return true;
    }

    /* --------- check if there are possible moves --------- */
    if (this.availableMoves().length === 0) {
      if (!only_result) this.gameOver("Remis");
      return true;
    }

    return false;
  }
}