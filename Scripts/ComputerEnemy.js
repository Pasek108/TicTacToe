"use strict";

class ComputerEnemy {
  constructor(ai_type) {
    this.ai_type = ai_type;
  }

  makeMove(game, maximalize) {
    switch (this.ai_type) {
      case 0: return this.random(game);
      case 1: return this.minimax(maximalize, game)[1];
      case 2: return this.alfabeta(maximalize, game)[1];
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
}
