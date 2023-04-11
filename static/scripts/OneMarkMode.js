"use strict";

class OneMarkMode extends Game {
  constructor(versus_id, player1_starts, maximalize) {
    super(versus_id, maximalize);

    if (this.versus_id == 0) this.computer_enemy = new ComputerEnemy("one_mark_4x4", maximalize);
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

    this.p1_mark.innerText = this.options[0];
    this.p2_mark.innerText = this.options[1];
    this.player_start.innerText = +(!player1_starts) + 1;
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
    super.playerMove(x, y);
    if (this.checkIfGameOver(false)) return;
    this.message_container.innerText = `Kolej gracza ${this.current_option + 1}`;
  }

  computerMove() {
    super.computerMove();
    setTimeout(() => (this.message_container.innerText = `Kolej gracza ${this.current_option + 1}`), 401);
  }

  checkIfGameOver(only_result = true) {
    if (super.checkIfGameOver(only_result)) {
      if (!only_result) {
        if (this.availableMoves().length === 0) this.gameOver("Remis");
        else this.gameOver(`Wygrał gracz ${+!(this.current_option * this.maximalize) + 1}`);
      }

      return true;
    }

    return false;
  }
}
