"use strict";

class MovableMode extends Game {
  constructor(versus_id, player_start_id, maximalize) {
    super(1, versus_id, player_start_id, maximalize, ["X", "O"], 3, "alphabeta");

    this.moves_counter = 0;
    this.pick_turn = false;
    this.pick = [];
    
    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove();
  }

  playerMove(x, y) {
    if (this.moves_counter < 6) {
      super.playerMove(x, y);
      this.moves_counter++;
      if (this.moves_counter < 6) return;
    }

    // if picking turn let user pick what to move
    if (this.pick_turn) this.pickMarkToMove(x, y);
    else {
      // move picked mark if its empty tile and one tile away
      const dist_x = Math.abs(x - this.pick[0]);
      const dist_y = Math.abs(y - this.pick[1]);
      if (this.game_state[x][y] === "" && dist_x + dist_y === 1) this.moveMark(x, y);

      // reset all light ups and end if game over
      this.board.resetLightUps();
      if (this.checkIfGameOver(false)) return;

      // light up possible picks for player, reset pick and go to picking turn
      const moves = this.availableMoves();
      moves.forEach((move) => this.board.lightUpTile(move[0], move[1], "#35bc43"));
      this.pick = [];
      this.pick_turn = !this.pick_turn;
    }
  }

  availableMoves() {
    let moves = [];
   
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.moves_counter < 6 && this.game_state[i][j] === "") moves.push([i, j]);
        else if (this.moves_counter >= 6 && this.game_state[i][j] === this.options[this.current_player_id]) {
          if (this.game_state[i]?.[j - 1] === "" || 
              this.game_state[i]?.[j + 1] === "" || 
              this.game_state[i - 1]?.[j] === "" || 
              this.game_state[i + 1]?.[j] === "") 
              moves.push([i, j]);
        }
      }
    }

    return moves;
  }

  pickMarkToMove(x, y) {
    // return if not current mark
    if (this.game_state[x][y] != this.options[this.current_player_id]) return;

    // light up possible movements
    if (this.game_state[x - 1]?.[y] === "") this.board.lightUpTile(x - 1, y, "#ffd100");
    if (this.game_state[x + 1]?.[y] === "") this.board.lightUpTile(x + 1, y, "#ffd100");
    if (this.game_state[x][y - 1] === "") this.board.lightUpTile(x, y - 1, "#ffd100");
    if (this.game_state[x][y + 1] === "") this.board.lightUpTile(x, y + 1, "#ffd100");

    // set picked mark
    this.pick = [x, y];
    this.pick_turn = !this.pick_turn;
  }

  moveMark(x, y) {
    this.board.removeMark(this.pick[0], this.pick[1]);
    this.game_state[this.pick[0]][this.pick[1]] = "";
    super.playerMove(x, y);
    this.moves_counter++;
  }
}
