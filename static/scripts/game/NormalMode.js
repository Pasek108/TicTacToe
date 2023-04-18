"use strict";

class NormalMode extends Game {
  constructor(versus_id, player_start_id, maximalize, size, marks, change) {
    super(0, versus_id, player_start_id, maximalize, marks, size, change, "alphabeta");
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove();
  }
}