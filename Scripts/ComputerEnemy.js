"use strict";

class ComputerEnemy {
  constructor(ai_type, maximalize) {
    this.ai_type = ai_type;
    this.maximalize = maximalize;
  }

  calculateMove(game) {
    switch (this.ai_type) {
      case "random": return this.random(game);
      case "minimax": return this.minimax(this.maximalize, game)[1];
      case "alfabeta": return this.alfabeta(this.maximalize, game)[1];
      case "modified_alfabeta": { 
        if (game.availableMoves().length > 10) return this.line(this.maximalize, game);
        else return this.alfabeta(this.maximalize, game)[1];
      }
    }
  }

  random(game) {
    let random_x = 0;
    let random_y = 0;

    while (true) {
      random_x = randomInt(0, game.game_state.length - 1);
      random_y = randomInt(0, game.game_state.length - 1);
      if (game[random_x][random_y] == "") break;
    }

    return [random_x, random_y];
  }

  minimax(maximalize, game) {
    if (game.checkIfGameOver()) return game.result();
    const results = [];

    game.availableMoves().forEach((move) => {
      game.makeMove(move[0], move[1]);
      results.push(this.minimax(!maximalize, game));
      results[results.length - 1][1] = game.back();
    });

    if (maximalize) return this.max(results);
    else return this.min(results);
  }

  alfabeta(maximalize, game, parent_value) {
    if (game.checkIfGameOver()) return game.result();
    const results = [];

    const moves = game.availableMoves();

    for (let i = 0; i < moves.length; i++) {
      game.makeMove(moves[i][0], moves[i][1]);
      results.push(this.minimax(!maximalize, game, maximalize ? this.max(results) : this.min(results)));
      results[results.length - 1][1] = game.back();

      if (parent_value != null) {
        if (maximalize && results[results.length - 1][0] > parent_value) break;
        if (!maximalize && results[results.length - 1][0] < parent_value) break;
      }
    }

    if (maximalize) return this.max(results);
    else return this.min(results);
  }

  min(results) {
    let min = results[0];
    results.forEach((result) => (result[0] < min[0] ? (min = result) : ""));
    return min;
  }

  max(results) {
    let max = results[0];
    results.forEach((result) => (result[0] > max[0] ? (max = result) : ""));
    return max;
  }

  line(maximalize, game) {
    const moves = game.availableMoves();
    let is_empty = true;
    let weights = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    /* ------------- mark occupied places with "big" weight ------------- */
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        let is_free = false;
        moves.forEach(move => (move[0] === i && move[1] == j) ? is_free = true : "");
        
        if (!is_free) {
          weights[i][j] = (maximalize) ? -20 : 20;
          is_empty = false;
        }
      }
    }

    if (is_empty) return [1, 1];

    /* ------------- count X in the same row, column, diagonals as possible move ------------- */
    moves.forEach(move => {
      weights[move[0]][move[1]] += this.countInRow(game.game_state, move[1], "X");
      weights[move[0]][move[1]] += this.countInCol(game.game_state, move[0], "X");
      if (move[0] === move[1]) weights[move[0]][move[1]] += this.countInDiag1(game.game_state, "X");
      if (move[0] === game.size - 1 - move[1]) weights[move[0]][move[1]] += this.countInDiag2(game.game_state, "X");
    });

    /* ------------- set starting result without "big" weight ------------- */
    let result = [0, 0];
    let result_value = (maximalize) ? 20 : -20;

    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        if (!maximalize && weights[i][j] < 20 && weights[i][j] > weights[result[0]][result[1]]) {
          result = [i, j];
          result_value = weights[i][j];
        }

        if (maximalize && weights[i][j] > -20 && weights[i][j] < result_value) {
          result = [i, j];
          result_value = weights[i][j];
        }
      }
    }

    /* ------------- find result ------------- */
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        /* ------------- the worst option ------------- */
        if (!maximalize && weights[i][j] < weights[result[0]][result[1]]) result = [i, j];
        /* ------------- the best option but no if it can make player win ------------- */
        else if (maximalize && weights[i][j] > weights[result[0]][result[1]]) {
          let counter = this.countInRow(weights, j, -20);
          if (counter === 2) continue;
          if (counter === 3) {
            result = [i, j];
            continue
          }

          counter = this.countInCol(weights, i, -20);
          if (counter === 2) continue;
          if (counter === 3) {
            result = [i, j];
            continue
          }

          counter = this.countInDiag1(weights, -20);
          if (counter === 2) continue;
          if (counter === 3) {
            result = [i, j];
            continue
          }

          counter = this.countInDiag2(weights, -20);
          if (counter === 2) continue;
          if (counter === 3) {
            result = [i, j];
            continue
          }

          result = [i, j];
        }
      }
    }

    return result;
  }

  countInRow(array, col_id, value) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) (array[i][col_id] === value) ? counter++ : "";
    return counter;
  }

  countInCol(array, row_id, value) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) (array[row_id][i] === value) ? counter++ : "";
    return counter;
  }

  countInDiag1(array, value) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) (array[i][i] === value) ? counter++ : "";
    return counter;
  }

  countInDiag2(array, value) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) (array[i][array.length - 1 - i] === value) ? counter++ : "";
    return counter;
  }
}
