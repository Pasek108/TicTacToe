"use strict"

class NormalMode extends Game {
  constructor(mode_id, versus_id, player_start_id, maximalize, marks, size, switch_sides) {
    super(mode_id, versus_id, player_start_id, maximalize, marks, size, switch_sides, "alphabeta")
    this.mode_name = "normal"
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove()
  }
}
