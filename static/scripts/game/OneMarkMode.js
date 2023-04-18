"use strict";

class OneMarkMode extends Game {
  constructor(versus_id, player_start_id, maximalize, size, marks, change) {
    super(2, versus_id, player_start_id, maximalize, marks, size, change, "one_mark_4x4");
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove();
  }

  isWonByStartingPlayer(x, y) {
    return this.player_start_id != this.current_player_id;
  }
}
