"use strict"

class OneMarkMode extends Game {
  constructor(mode_id, versus_id, player_start_id, maximalize, marks, size, switch_sides) {
    super(mode_id, versus_id, player_start_id, maximalize, marks, size, switch_sides, "one_mark_4x4")
    this.mode_name = "one_mark"
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove()
  }

  isWonByStartingPlayer(x, y) {
    return this.player_start_id != this.current_player_id
  }
}
