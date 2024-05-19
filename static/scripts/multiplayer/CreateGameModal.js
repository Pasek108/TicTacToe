"use strict"

class CreateGameModal {
  constructor(create_game_callback, socket) {
    this.container = document.querySelector(".create-game-modal")

    this.socket = socket
    this.create_game_callback = create_game_callback

    this.mode_id = 0
    this.mode_inputs = this.container.querySelectorAll(".mode-input")
    this.mode_inputs.forEach((mode_input) => mode_input.addEventListener("input", this.setGamemode.bind(this)))

    this.size = this.container.querySelector("#size")
    this.size_options = this.container.querySelectorAll("#size option")

    this.reverse = this.container.querySelector("#reverse")

    this.password = this.container.querySelector("#password")
    this.password.addEventListener("input", this.cutTo7Letters.bind(this))

    this.marks = this.container.querySelectorAll(".mark input")
    this.marks.forEach((mark) => mark.addEventListener("input", this.validateMark.bind(this)))

    this.starting_player_id = 0
    this.starting_player = this.container.querySelectorAll(".radio input")
    this.starting_player.forEach((input) => input.addEventListener("click", this.setStartingPlayer.bind(this)))

    this.change = this.container.querySelector("#change")

    this.close_button = this.container.querySelector(".close")
    this.close_button.addEventListener("click", this.hide.bind(this))

    this.create_button = this.container.querySelector(".create")
    this.create_button.addEventListener("click", this.createGame.bind(this))
  }

  show() {
    this.container.style.display = null
  }

  hide() {
    this.container.style.display = "none"
  }

  setGamemode(evt) {
    this.mode_id = +evt.currentTarget.value
    this.setDefaultValuesForGamemode()
  }

  setDefaultValuesForGamemode() {
    const int_is_4x4_mode = +(this.mode_id === 2)

    // select size 3 (4 for one mark mode)
    this.size_options[1 + int_is_4x4_mode].selected = true

    // if one mark mode set marks as X, if not set XO
    this.marks[0].value = "X"

    if (this.mode_id === 2) this.marks[1].value = "X"
    else this.marks[1].value = "O"
  }

  cutTo7Letters(evt) {
    if (this.password.value.length > 7) {
      this.password.value = this.password.value.slice(0, 7)
    }
  }

  validateMark(evt) {
    const mark_input = evt.currentTarget
    const regex = new RegExp("[A-Za-z1-9+?!@#$%&=-]")

    // cut to 1 letter
    if (mark_input.value.length > 1) mark_input.value = mark_input.value[0]

    // if mark is not in regex or if not one mark mode and marks are the same hilight it and disable play button
    let is_mark_wrong = !regex.test(mark_input.value)

    if (this.mode_id !== 2) {
      for (let i = 0; i < this.marks.length; i++) {
        if (this.marks[i] != mark_input && mark_input.value === this.marks[i].value) is_mark_wrong = true
      }
    }

    if (is_mark_wrong) {
      mark_input.value = ""
      mark_input.style.background = "red"
      this.create_button.disabled = true
      return
    }

    // set both marks the same when one mark mode
    if (this.mode_id === 2) this.marks.forEach((mark) => (mark.value = mark_input.value[0]))

    // reset hilight it and enable play button
    mark_input.style.background = null
    this.create_button.disabled = false
  }

  setStartingPlayer(evt) {
    this.starting_player_id = evt.currentTarget.value
  }

  createGame() {
    this.hide()

    const game_data = {
      mode_id: this.mode_id,
      size: this.size.value,
      reverse: this.reverse.checked,
      password: this.password.value,
      options: [this.marks[0].value, this.marks[1].value],
      starting_player_id: this.starting_player_id,
      change: this.change.checked,
    }

    this.socket.emit("create_game", JSON.stringify(game_data), (game_info) => {
      lobby.hide()
      this.create_game_callback(game_info)
    })
  }
}
