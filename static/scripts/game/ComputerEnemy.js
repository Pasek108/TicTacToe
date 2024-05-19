"use strict"

class ComputerEnemy {
  constructor(ai_type, maximalize) {
    this.ai_type = ai_type
    this.maximalize = maximalize
  }

  calculateMove(game) {
    switch (this.ai_type) {
      case "random":
        return this.random(game)
      case "minimax":
        return this.minimax(this.maximalize, game)[1]
      case "alphabeta":
        return this.alphabeta(this.maximalize, game)[1]
      case "movable":
        return this.movable(this.maximalize, game, 0)[1]
      case "one_mark_4x4":
        return this.oneMark4x4(this.maximalize, game)
    }
  }

  /* -------------------- random -------------------- */
  random(game) {
    let random_x = 0
    let random_y = 0

    while (true) {
      random_x = randomInt(0, game.game_state.length - 1)
      random_y = randomInt(0, game.game_state.length - 1)
      if (game[random_x][random_y] == "") break
    }

    return [random_x, random_y]
  }

  /* -------------------- minimax -------------------- */
  minimax(maximalize, game) {
    if (game.checkIfGameOver()) return game.result()

    let min = [10],
      max = [-10]

    game.availableMoves().forEach((move) => {
      game.makeMove(move[0], move[1])
      const result = this.minimax(!maximalize, game)
      result[1] = game.back()

      if (result[0] < min[0]) min = result
      if (result[0] > max[0]) max = result
    })

    return maximalize ? max : min
  }

  /* -------------------- alphabeta -------------------- */
  alphabeta(maximalize, game, parent_value) {
    if (game.checkIfGameOver()) return game.result()

    let min = [10],
      max = [-10]
    const moves = game.availableMoves()

    for (let i = 0; i < moves.length; i++) {
      game.makeMove(moves[i][0], moves[i][1])
      const result = this.alphabeta(!maximalize, game, maximalize ? max : min)
      result[1] = game.back()

      if (result[0] < min[0]) min = result
      if (result[0] > max[0]) max = result

      if (parent_value?.[1] != null) {
        if (maximalize && result[0] > parent_value[0]) break
        if (!maximalize && result[0] < parent_value[0]) break
      }
    }

    return maximalize ? max : min
  }

  /* -------------------- movable algorithm -------------------- */
  movable(maximalize, game, depth, parent_value) {
    if (game.checkIfGameOver() || depth >= 8) return game.result()

    let min = [10],
      max = [-10]
    const moves = game.availableMoves()

    for (let i = 0; i < moves.length; i++) {
      game.makeMove(moves[i][0], moves[i][1])
      const result = this.movable(!maximalize, game, depth + 1, maximalize ? max : min)
      result[1] = game.back()

      if (result[0] < min[0]) min = result
      if (result[0] > max[0]) max = result

      if (parent_value?.[1] != null) {
        if (maximalize && result[0] > parent_value[0]) break
        if (!maximalize && result[0] < parent_value[0]) break
      }
    }

    return maximalize ? max : min
  }

  /* -------------------- One mark algorithms -------------------- */
  oneMark4x4(maximalize, game) {
    if (game.availableMoves().length <= 11) return this.alphabeta(maximalize, game)[1]
    return maximalize ? this.makeLine(game) : this.avoidLine(game)
  }

  avoidLine(game) {
    const moves = game.availableMoves()
    let weights = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

    this.markOccupiedPlaces(weights, moves, 20)
    this.fillWeights(weights, moves, game)

    // find result
    let result = [0, 0]

    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        if (weights[i][j] < weights[result[0]][result[1]]) result = [i, j]
      }
    }

    return result
  }

  makeLine(game) {
    const moves = game.availableMoves()
    if (moves.length === 16) return [1, 1]

    let weights = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

    this.markOccupiedPlaces(weights, moves, -20)
    this.fillWeights(weights, moves, game)

    //set start result small but no occupied place
    let result = [0, 0]
    let result_value = 20

    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        if (weights[i][j] > -20 && weights[i][j] < result_value) {
          result = [i, j]
          result_value = weights[i][j]
        }
      }
    }

    // find result
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        if (weights[i][j] > weights[result[0]][result[1]]) {
          let counter = this.countInRow(weights, j, -20)
          if (counter === 2) continue
          else if (counter === 3) {
            result = [i, j]
            continue
          }

          counter = this.countInCol(weights, i, -20)
          if (counter === 2) continue
          else if (counter === 3) {
            result = [i, j]
            continue
          }

          counter = this.countInDiag1(weights, -20)
          if (counter === 2) continue
          else if (counter === 3) {
            result = [i, j]
            continue
          }

          counter = this.countInDiag2(weights, -20)
          if (counter === 2) continue
          else if (counter === 3) {
            result = [i, j]
            continue
          }

          result = [i, j]
        }
      }
    }

    return result
  }

  /* ------ mark occupied places with "big weight" ------ */
  markOccupiedPlaces(weights, moves, weight) {
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        let is_free = false
        moves.forEach((move) => (move[0] === i && move[1] == j ? (is_free = true) : ""))
        if (!is_free) weights[i][j] = weight
      }
    }
  }

  /* ------ count all X for moves in it's row, column, diagonals ------ */
  fillWeights(weights, moves, game) {
    moves.forEach((move) => {
      weights[move[0]][move[1]] += this.countInRow(game.game_state, move[1], game.options[0])
      weights[move[0]][move[1]] += this.countInCol(game.game_state, move[0], game.options[0])
      if (move[0] === move[1]) weights[move[0]][move[1]] += this.countInDiag1(game.game_state, game.options[0])
      if (move[0] === game.size - 1 - move[1]) weights[move[0]][move[1]] += this.countInDiag2(game.game_state, game.options[0])
    })
  }

  /* ------ count values in row ------ */
  countInRow(array, col_id, value) {
    let counter = 0
    for (let i = 0; i < array.length; i++) array[i][col_id] === value ? counter++ : ""
    return counter
  }

  /* ------ count values in column ------ */
  countInCol(array, row_id, value) {
    let counter = 0
    for (let i = 0; i < array.length; i++) array[row_id][i] === value ? counter++ : ""
    return counter
  }

  /* ------ count values in top left to right bottom diagonal ------ */
  countInDiag1(array, value) {
    let counter = 0
    for (let i = 0; i < array.length; i++) array[i][i] === value ? counter++ : ""
    return counter
  }

  /* ------ count values in top right to left bottom diagonal ------ */
  countInDiag2(array, value) {
    let counter = 0
    for (let i = 0; i < array.length; i++) array[i][array.length - 1 - i] === value ? counter++ : ""
    return counter
  }
}
