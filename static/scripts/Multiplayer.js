"use strict";

class Multiplayer extends Game {
    constructor(player1_starts, maximalize) {
        super(2, maximalize);

        this.size = 3;
        this.board = new Board(this.size, this.playerMove.bind(this));
        this.initGameState();

        this.show();

        this.socket = io.connect("http://127.0.0.1:5000");
        this.socket.on("connect", () => {
            this.socket.emit("join_room", {room: "1"});
        });

        this.socket.on("join_room_announcement", (data) => {
            console.log(data)
        })

        this.socket.on("player_move", (data) => {
            this.board.placeMark(data.x, data.y, this.options[this.current_option]);
            this.makeMove(data.x, data.y);
        })
    }

    playerMove(x, y) {
        this.socket.emit("move", {room: "1", x, y});
    }
}