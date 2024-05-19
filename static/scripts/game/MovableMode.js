"use strict"

class MovableMode extends Game {
  constructor(mode_id, versus_id, player_start_id, maximalize, marks, size, switch_sides) {
    super(mode_id, versus_id, player_start_id, maximalize, marks, size, switch_sides, "movable")

    this.mode_name = "movable"
    this.moves_counter = 0
    this.max_moves = 16
    this.pick_turn = this.is_computer_an_enemy
    this.pick = []

    this.moves_left = this.moves_left_container.querySelectorAll(".moves")
    this.showMovementsLeft()

    if (this.is_computer_an_enemy && this.player_start_id === 1) this.computerMove()
  }

  playerMove(x, y) {
    if (this.is_computer_an_enemy && this.player_start_id != this.current_player_id) return false
    if (this.is_game_over) return false

    if (this.moves_counter < 6) {
      if (this.game_state[x][y] != "") return false

      this.board.placeMark(x, y, this.options[this.current_player_id])

      this.makeMove([-1, -1], [x, y])
      this.showMovementsLeft()

      if (this.checkIfGameOver(false)) return false

      this.showMessage("current_turn")
      if (this.is_computer_an_enemy) this.computerMove()

      if (this.moves_counter < 6) return
    }

    // if picking turn let user pick what to move
    if (this.pick_turn) this.pickMarkToMove(x, y)
    else {
      // move picked mark if its empty tile and one tile away
      const dist_x = Math.abs(x - this.pick[0])
      const dist_y = Math.abs(y - this.pick[1])
      if (this.game_state[x][y] === "" && dist_x + dist_y === 1) {
        this.board.placeMark(x, y, this.options[this.current_player_id])
        this.board.removeMark(this.pick[0], this.pick[1])

        this.makeMove(this.pick, [x, y])
        this.showMovementsLeft()

        this.board.resetLightUps()
        this.showMessage("current_turn")
        if (this.checkIfGameOver(false)) return
        if (this.is_computer_an_enemy) this.computerMove()
      }

      // light up possible picks for player, reset pick and go to picking turn
      this.board.resetLightUps()
      const moves = this.availableMoves()
      moves.forEach((move) => this.board.lightUpTile(move[0][0], move[0][1], "#35bc43"))
      this.pick = []
      this.pick_turn = !this.pick_turn
      this.pickMarkToMove(x, y)
    }
  }

  computerMove() {
    const move = this.computer_enemy.calculateMove(this)

    setTimeout(() => {
      this.board.placeMark(move[1][0], move[1][1], this.options[this.current_player_id])
      if (move[0][0] >= 0) this.board.removeMark(move[0][0], move[0][1])

      this.makeMove(move[0], move[1])
      this.showMovementsLeft()
      this.board.resetLightUps()

      if (this.checkIfGameOver(false)) return

      this.showMessage("current_turn")

      if (this.moves_counter < 6) return
      const moves = this.availableMoves()
      moves.forEach((move) => this.board.lightUpTile(move[0][0], move[0][1], "#35bc43"))
    }, 500)
  }

  showMovementsLeft() {
    this.moves_left.forEach((moves) => (moves.innerText = `${this.max_moves - this.moves_counter}`))
  }

  availableMoves() {
    let moves = []

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.moves_counter < 6 && this.game_state[i][j] === "")
          moves.push([
            [-1, -1],
            [i, j],
          ])
        else if (this.moves_counter >= 6 && this.game_state[i][j] === this.options[this.current_player_id]) {
          if (this.game_state[i]?.[j - 1] === "")
            moves.push([
              [i, j],
              [i, j - 1],
            ])
          if (this.game_state[i]?.[j + 1] === "")
            moves.push([
              [i, j],
              [i, j + 1],
            ])
          if (this.game_state[i - 1]?.[j] === "")
            moves.push([
              [i, j],
              [i - 1, j],
            ])
          if (this.game_state[i + 1]?.[j] === "")
            moves.push([
              [i, j],
              [i + 1, j],
            ])
        }
      }
    }

    return moves
  }

  pickMarkToMove(x, y) {
    // return if not current mark
    if (this.game_state[x][y] != this.options[this.current_player_id]) return

    // light up possible movements
    if (this.game_state[x - 1]?.[y] === "") this.board.lightUpTile(x - 1, y, "#ffd100")
    if (this.game_state[x + 1]?.[y] === "") this.board.lightUpTile(x + 1, y, "#ffd100")
    if (this.game_state[x][y - 1] === "") this.board.lightUpTile(x, y - 1, "#ffd100")
    if (this.game_state[x][y + 1] === "") this.board.lightUpTile(x, y + 1, "#ffd100")

    // set picked mark
    this.pick = [x, y]
    this.pick_turn = !this.pick_turn
  }

  makeMove(from, to) {
    this.moves_history.push([from, to])

    if (this.moves_counter >= 6) this.game_state[from[0]][from[1]] = ""
    this.game_state[to[0]][to[1]] = this.options[this.current_player_id]

    this.current_player_id = +!this.current_player_id
    this.moves_counter++
  }

  back() {
    const last_action = this.moves_history.pop()
    const from = last_action[0]
    const to = last_action[1]

    this.moves_counter--
    this.current_player_id = +!this.current_player_id
    this.game_state[to[0]][to[1]] = ""
    if (this.moves_counter >= 6) this.game_state[from[0]][from[1]] = this.options[this.current_player_id]

    return last_action
  }

  restart() {
    this.moves_counter = 0
    this.pick_turn = this.is_computer_an_enemy
    this.pick = []
    super.restart()
    this.moves_left.forEach((move) => (move.innerText = `${this.max_moves - this.moves_counter}`))
  }

  checkIfGameOver(only_result = true) {
    const game_over = super.checkIfGameOver(only_result)

    if (game_over === true) return true
    if (this.moves_counter >= this.max_moves) {
      if (!only_result) {
        this.showMessage("draw")
        this.gameOver()
      }
      return true
    }

    return false
  }
}
