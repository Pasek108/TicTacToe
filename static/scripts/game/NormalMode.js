"use strict";

class NormalMode extends Game {
  constructor(versus_id, player1_starts, maximalize) {
    super(versus_id, maximalize);

    if (this.versus_id == 0) this.computer_enemy = new ComputerEnemy("alphabeta", maximalize);
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

    this.p1_mark.innerText = this.options[0];
    this.p2_mark.innerText = this.options[1];
    this.player_start.innerText = `P${+(!player1_starts) + 1}`;
  }
}
