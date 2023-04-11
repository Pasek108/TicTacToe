"use strict";

const socket = io.connect("http://127.0.0.1:5000");
socket.on("connect", () => {
    socket.emit("join_lobby");
});

socket.on("load_rooms", (data) => {
    console.log(data)
});

class Lobby {
    constructor() {
        this.container = document.querySelector(".lobby");

        this.create_game_modal = this.container.querySelector(".create-game-modal");
        
        this.close_modal_button = this.container.querySelector(".close");
        this.close_modal_button.addEventListener("click", () => this.create_game_modal.style.display = "none")

        this.create_room_button = this.container.querySelector(".create-room");
        this.create_room_button.addEventListener("click", () => this.create_game_modal.style.display = null)
    }
}

new Lobby();