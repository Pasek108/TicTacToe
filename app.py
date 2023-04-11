from flask import Flask, render_template
from flask_socketio import SocketIO, join_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)
rooms = []


# --------- routes ---------
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/multiplayer")
def multiplayer():
    return render_template('multiplayer.html')


# --------- sockets ---------
@socketio.on("join_lobby")
def handle_join_lobby():
    app.logger.info("lobby joined")
    socketio.emit("load_rooms", {'rooms': rooms})


@socketio.on("join_room")
def handle_join_room(data):
    app.logger.info("room {}".format(data['room']))
    join_room(data['room'])
    socketio.emit("join_room_announcement", data)


@socketio.on("disconnect")
def handle_disconnect():
    app.logger.info("aaa")


@socketio.on("move")
def handle_move(data):
    app.logger.info("move x:{} y:{}".format(data['x'], data['y']))
    socketio.emit("player_move", data, room=data['room'])


if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
