"use strict";

class NormalMode extends Game {
  constructor(versus_id, player_start_id, maximalize) {
    super(0, versus_id, player_start_id, maximalize, ["X", "O"], 3, "alphabeta");
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove();
  }
}