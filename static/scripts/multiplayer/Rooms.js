"use strict"

class Rooms {
  constructor(create_game_callback, socket) {
    this.container = document.querySelector(".rooms table")
    this.room_template = this.container.querySelector("#room-template")

    this.socket = socket
    this.create_game_callback = create_game_callback

    this.password_modal = document.querySelector(".password-modal")
    this.password_modal_input = this.password_modal.querySelector("#access-password")
    this.password_modal_confirm = this.password_modal.querySelector(".confirm")
    this.password_modal_cancel = this.password_modal.querySelector(".cancel")
    this.password_modal_cancel.addEventListener("click", () => (this.password_modal.style.display = "none"))

    this.loadFromLink()
  }

  loadFromLink() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("room") && urlParams.has("password")) this.joinRoom(urlParams.get("room"), urlParams.get("password"))
  }

  loadRoomsInfo(rooms) {
    this.container.innerHTML = ""
    let added_rooms = 0

    rooms.forEach((room) => {
      if (room == "") return
      added_rooms++

      const room_info = JSON.parse(room)
      const container = this.room_template.content.cloneNode(true)

      container.querySelector(".id").innerText = room_info.room_id

      // load mode name
      this.mode_names = container.querySelectorAll(".mode-name")
      this.mode_names.forEach((mode) => mode.classList.add("hidden"))
      this.mode_names[room_info.mode_id].classList.remove("hidden")

      //load marks
      this.marks = container.querySelector(".marks")
      this.marks.innerText = `${room_info.options[0]}${room_info.options[1]}`

      //load size
      this.marks = container.querySelector(".size")
      this.marks.innerText = `${room_info.size}x${room_info.size}`

      // load mode type
      this.type_names = container.querySelectorAll(".type-name")
      this.type_names.forEach((type) => type.classList.add("hidden"))
      this.type_names[room_info.type_id].classList.remove("hidden")

      // load number of players
      this.players = container.querySelector(".players")
      this.players.innerText = `${2 - room_info.free_spaces}/2`

      this.join_button = container.querySelector(".join")

      if (room_info.free_spaces == 0) this.join_button.disabled = true
      else if (!room_info.protected) this.join_button.addEventListener("click", () => this.joinRoom(room_info.room_id, ""))
      else {
        this.join_button.classList.add("protected")
        this.join_button.addEventListener("click", () => this.inputPassword(room_info.room_id))
      }

      this.container.appendChild(container)
    })

    if (added_rooms === 0) {
      const container = document.createElement("tr")
      container.className = "empty"
      this.container.appendChild(container)
    }
  }

  inputPassword(room_id) {
    this.password_modal.style.display = null

    this.password_modal_confirm.addEventListener("click", () => {
      this.joinRoom(room_id, this.password_modal_input.value)
      this.password_modal.style.display = "none"
    })
  }

  joinRoom(room_id, password) {
    this.socket.emit("join_room", room_id, password, (game_info) => {
      if (!game_info) return
      lobby.hide()
      this.create_game_callback(game_info)
    })
  }
}
