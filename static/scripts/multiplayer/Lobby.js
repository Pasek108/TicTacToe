"use strict";

const socket = io.connect("http://127.0.0.1:5000");

window.addEventListener("beforeunload", () => {
  socket.emit("disconnect");
})

class Lobby {
  constructor() {
    this.container = document.querySelector(".lobby");

    this.rooms = new Rooms(socket);
    this.create_game_modal = new CreateGameModal(socket);

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
}

const lobby = new Lobby();
