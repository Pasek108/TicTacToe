"use strict";

class Rooms {
  constructor(socket) {
    this.container = document.querySelector(".rooms table");
    this.room_template = this.container.querySelector("#room-template");
    this.socket = socket;
  }

  loadRoomsInfo(rooms) {
    this.container.innerHTML = "";
    let added_rooms = 0;

    rooms.forEach(room => {
      if (room == "") return;
      added_rooms++;

      const room_info = JSON.parse(room);
      const container = this.room_template.content.cloneNode(true);

      container.querySelector(".id").innerText = room_info.id;

      // load mode name
      this.mode_names = container.querySelectorAll(".mode-name");
      this.mode_names.forEach((mode) => mode.classList.add("hidden"));
      this.mode_names[room_info.mode_id].classList.remove("hidden");

      // load mode type
      this.type_names = container.querySelectorAll(".type-name");
      this.type_names.forEach((type) => type.classList.add("hidden"));
      this.type_names[room_info.type_id].classList.remove("hidden");

      this.players = container.querySelector(".players");
      this.players.innerText = `${2 - room_info.free_spaces}/2`;

      this.join_button = container.querySelector(".join");
      if (room_info.free_spaces == 0) this.join_button.disabled = true;
      else this.join_button.addEventListener("click", () => this.joinRoom(room_info.id));

      this.container.appendChild(container);
    });

    if (added_rooms === 0) {
      const container = document.createElement("tr");
      container.className = "empty";
      this.container.appendChild(container);
    }
  }

  joinRoom(room_id) {
    this.socket.emit("join_room", room_id, (room_info) => {
      if (!room_info) return;
      lobby.hide();

      this.game = new MultiplayerGame(
        room_info.mode_id, 
        room_id, 
        room_info.player_id, 
        room_info.type_id === 0, 
        room_info.game_state, 
        room_info.switch_sides,
        this.socket
      );
    });
  }
}