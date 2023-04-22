"use strict";

class Menu {
  constructor() {
    this.container = document.querySelector(".menu");
    this.steps = this.container.querySelectorAll(".step");

    /* ---------- step 1 ---------- */
    this.versus_id = 0;
    this.versus_messages = this.steps[0].querySelectorAll("h2 .message");
    this.versus_options = this.steps[0].querySelectorAll(".versus .option");
    this.versus_options.forEach((option) => option.addEventListener("click", this.changeVersusOption.bind(this)));

    this.gamemode_id = 0;
    this.gamemode_options = this.steps[0].querySelectorAll(".gamemode .option");
    this.gamemode_options.forEach((option) => option.addEventListener("click", this.setGamemode.bind(this)));

    /* ---------- step 2 ---------- */
    this.player_id = 0;
    this.player_options = this.steps[1].querySelectorAll(".player .option");
    this.player_options.forEach((option) => option.addEventListener("click", this.changePlayerOption.bind(this)));

    this.type_id = 0;
    this.type_options = this.steps[1].querySelectorAll(".type .option");
    this.type_options.forEach((option) => option.addEventListener("click", this.setType.bind(this)));

    /* ---------- step 3 ---------- */
    this.size = this.steps[2].querySelector("#size");
    this.size_options = this.steps[2].querySelectorAll("#size option");

    this.marks = this.steps[2].querySelectorAll(".mark input");
    this.marks.forEach((mark) => mark.addEventListener("input", this.validateMark.bind(this)));

    this.change = this.steps[2].querySelector("#change");

    // back buttons
    this.back_buttons = this.container.querySelectorAll(".back");
    this.back_buttons.forEach((button, id) => button.addEventListener("click", () => this.showStep(id)));

    // play button
    this.play_button = this.steps[2].querySelector(".play");
    this.play_button.addEventListener("click", this.loadGame.bind(this));
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
    this.showStep(0);
  }

  changeVersusOption(evt) {
    const option = evt.currentTarget;
    this.versus_id = +option.dataset.id;

    this.versus_options.forEach((option) => option.classList.remove("active"));
    option.classList.add("active");

    this.versus_messages.forEach((message) => message.classList.add("hidden"));
    this.versus_messages[+option.dataset.id].classList.remove("hidden");
  }

  setGamemode(evt) {
    const option = evt.currentTarget;
    this.gamemode_id = +option.dataset.id;
    this.setDefaultValuesForGamemode();
    this.showStep(1);
  }

  setDefaultValuesForGamemode() {
    const int_is_4x4_mode = +(this.gamemode_id === 2);

    for (let i = 0; i < this.size_options.length; i++) {
      const option_value = +this.size_options[i].value;

      // unblock and unselect all options
      this.size_options[i].disabled = false;
      this.size_options[i].selected = false;

      // if vs AI and size > 3 (4 for one mark mode) block this size and select the highest possible
      if (this.versus_id === 0 && option_value > 3 + int_is_4x4_mode) this.size_options[i].disabled = true;
      if (this.versus_id === 0 && option_value == 3 + int_is_4x4_mode) this.size_options[i].selected = true;
    }

    // if not vs AI select size 3 (4 for one mark mode)
    if (this.versus_id === 1) this.size_options[1 + int_is_4x4_mode].selected = true;

    // if one mark mode set marks as X, if not set XO
    this.marks[0].value = "X";

    if (this.gamemode_id === 2) this.marks[1].value = "X";
    else this.marks[1].value = "O";
  }

  changePlayerOption(evt) {
    const option = evt.currentTarget;
    this.player_id = +option.dataset.id;

    this.player_options.forEach((option) => option.classList.remove("active"));
    option.classList.add("active");
  }

  setType(evt) {
    const option = evt.currentTarget;
    this.type_id = +option.dataset.id;
    this.showStep(2);
  }

  validateMark(evt) {
    const mark_input = evt.currentTarget;
    const regex = new RegExp("[A-Za-z1-9+?!@#$%&=-]");

    // cut to 1 letter
    if (mark_input.value.length > 1) mark_input.value = mark_input.value[0];

    // if mark is not in regex or if not one mark mode and marks are the same hilight it and disable play button
    let is_mark_wrong = !regex.test(mark_input.value);

    if (this.gamemode_id !== 2) {
      for (let i = 0; i < this.marks.length; i++) {
        if (this.marks[i] != mark_input && mark_input.value === this.marks[i].value) is_mark_wrong = true;
      }
    }

    if (is_mark_wrong) {
      mark_input.value = "";
      mark_input.style.background = "red";
      this.play_button.disabled = true;
      return;
    }

    // set both marks the same when one mark mode
    if (this.gamemode_id === 2) this.marks.forEach((mark) => (mark.value = mark_input.value[0]));

    // reset hilight it and enable play button
    mark_input.style.background = null;
    this.play_button.disabled = false;
  }

  showStep(step_id) {
    this.steps.forEach((step) => (step.style.display = "none"));
    this.steps[step_id].style.display = null;
  }

  loadGame(evt) {
    const maximalize = !this.type_id;
    const size = +this.size.value;
    const marks = [this.marks[0].value, this.marks[1].value];
    const change = this.change.checked;

    switch (this.gamemode_id) {
      case 0: this.game = new NormalMode(this.gamemode_id, this.versus_id, this.player_id, maximalize, marks, size, change); break;
      case 1: this.game = new MovableMode(this.gamemode_id, this.versus_id, this.player_id, maximalize, marks, size, change); break;
      case 2: this.game = new OneMarkMode(this.gamemode_id, this.versus_id, this.player_id, maximalize, marks, size, change); break;
    }

    this.hide();
  }
}

const menu = new Menu();
