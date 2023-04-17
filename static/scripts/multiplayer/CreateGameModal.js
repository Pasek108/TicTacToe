"use strict";

class CreateGameModal {
  constructor(socket) {
    this.container = document.querySelector(".create-game-modal");
    this.socket = socket;

    this.close_button = this.container.querySelector(".close");
    this.close_button.addEventListener("click", this.hide.bind(this));

    this.gamemode_id = 0;
    this.mode_inputs = this.container.querySelectorAll(".mode-input");
    this.mode_inputs.forEach((mode_input) => mode_input.addEventListener("input", this.changeGamemode.bind(this)));

    this.starting_player_id = 0;
    this.starting_player = this.container.querySelectorAll(".radio input");
    this.starting_player.forEach((input) => input.addEventListener("click", this.changeStartingPlayer.bind(this)));

    this.password = this.container.querySelector("#password");
    this.password.addEventListener("input", this.cutTo7Letters.bind(this));

    this.reverse = this.container.querySelector("#reverse");
    this.change = this.container.querySelector("#change");

    this.create_button = this.container.querySelector(".create");
    this.create_button.addEventListener("click", this.createGame.bind(this));
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
  }

  changeGamemode(evt) {
    this.gamemode_id = evt.currentTarget.value;
  }

  changeStartingPlayer(evt) {
    this.starting_player_id = evt.currentTarget.value;
  }

  cutTo7Letters(evt) {
    if (this.password.value.length > 7) {
      this.password.value = this.password.value.slice(0, 7);
    }
  }

  createGame() {
    this.hide();
    
    const game_data = {
      gamemode_id: this.gamemode_id,
      reverse: this.reverse.checked,
      password: this.password.value,
      starting_player_id: this.starting_player_id,
      change: this.change.checked,
    };

    this.socket.emit("create_game", JSON.stringify(game_data), (game_info) => {
      lobby.hide();
      this.game = new MultiplayerGame(
        game_info.id, 
        game_info.player_id, 
        game_info.type_id === 0, 
        game_info.game_state, 
        game_info.switch_sides,
        this.socket
      );
    });
  }
}