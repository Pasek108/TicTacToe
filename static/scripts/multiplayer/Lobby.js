"use strict";

const socket = io.connect("http://127.0.0.1:5000");

window.addEventListener("beforeunload", () => {
  socket.emit("disconnect");
});

class Lobby {
  constructor() {
    this.container = document.querySelector(".lobby");

    this.game = undefined;

    this.rooms = new Rooms(this.createGame.bind(this), socket);
    this.create_game_modal = new CreateGameModal(this.createGame.bind(this), socket);

    this.create_room_button = this.container.querySelector(".create-room");
    this.create_room_button.addEventListener("click", () => this.create_game_modal.show());

    socket.emit("load_lobby", (rooms) => this.rooms.loadRoomsInfo(rooms));
    socket.on("refresh_lobby", (rooms) => this.rooms.loadRoomsInfo(rooms));
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
  }

  createGame(game_info) {
    this.multiplayer_game = multiplayerClassCreator(game_info.mode_id);
    if (this.game != null) this.game.remove();
    this.game = new this.multiplayer_game(
      game_info.mode_id,
      game_info.player_id,
      game_info.type_id === 0,
      game_info.options,
      game_info.size,
      game_info.switch_sides,
      game_info.room_id,
      game_info.game_state,
      game_info.password,
      game_info.active_players,
      game_info.moves_counter,
      socket
    );
  }
}

const lobby = new Lobby();
