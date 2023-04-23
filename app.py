from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, leave_room
import json
from Game import Game

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)
rooms = []


# ------------------ routes ------------------
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/multiplayer")
def multiplayer():
    return render_template('multiplayer.html')


# ------------------ sockets ------------------
@socketio.on("disconnect")
def on_disconnect():
    for room in rooms:
        if room != "" and request.sid in rooms[int(room.room_id)].players:
            on_leave_game(room.room_id)


@socketio.on("load_lobby")
def on_load_lobby():
    rooms_info = map(lambda room: "" if room == "" else json.dumps(room.get_room_info()), rooms)
    return list(rooms_info)


@socketio.on("leave_game")
def on_leave_game(room_id):
    leave_room(str(room_id))

    if not rooms[int(room_id)].player_leave(request.sid):
        rooms[int(room_id)] = ""

    if rooms[int(room_id)] != "":
        socketio.emit("room_players_change", rooms[int(room_id)].get_active_players(), room=str(room_id))

    socketio.emit("refresh_lobby", on_load_lobby())


@socketio.on("create_game")
def on_create_game(data):
    game_info = json.loads(data)

    room_id = -1
    for i in range(len(rooms)):
        if rooms[i] == "":
            room_id = i
            break

    if room_id < 0:
        room_id = len(rooms)

    game = Game(int(room_id),
                int(game_info["mode_id"]),
                int(game_info["reverse"]),
                int(game_info['starting_player_id']),
                int(game_info['size']),
                game_info['options'],
                game_info["password"],
                game_info["change"],
                request.sid)

    if room_id < len(rooms):
        rooms[room_id] = game
    elif room_id == len(rooms):
        rooms.append(game)

    socketio.emit("refresh_lobby", on_load_lobby())
    join_room(str(room_id))
    return rooms[int(room_id)].get_game_info(request.sid)


@socketio.on("join_room")
def on_join_room(room_id, password):
    if room_id is None or int(room_id) >= len(rooms) or rooms[int(room_id)] == "":
        return False

    if not rooms[int(room_id)].player_join(request.sid, password):
        return False

    join_room(str(room_id))
    socketio.emit("refresh_lobby", on_load_lobby())
    socketio.emit("room_players_change", rooms[int(room_id)].get_active_players(), room=str(room_id))
    return rooms[int(room_id)].get_game_info(request.sid)


@socketio.on("move")
def on_move(data):
    room = data['room']
    player_start_id = data['player_start_id']
    x = data['x']
    y = data['y']
    from_x = data['from_x']
    from_y = data['from_y']

    if int(room) < len(rooms) and not rooms[room].player_move(x, y, player_start_id, from_x, from_y):
        return

    socketio.emit("player_move", data, room=str(room))


@socketio.on("restart")
def on_restart(room_id):
    if rooms[int(room_id)].restart(request.sid):
        socketio.emit('restart', room=str(room_id))


if __name__ == '__main__':
    socketio.run(app, debug=True)
