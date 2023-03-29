"use strict";

class Menu {
  constructor() {
    this.container = document.querySelector(".menu");
    this.step1 = this.container.querySelector(".step1");
    this.step2 = this.container.querySelector(".step2");

    // versus
    this.versus_id = 0;
    this.versus_message = this.step1.querySelector("h2");
    this.versus_options = this.step1.querySelectorAll(".versus .option");
    this.versus_options.forEach((option) => option.addEventListener("click", this.changeVersusOption.bind(this)));

    // gamemode
    this.gamemode_id = 0;
    this.gamemode_options = this.step1.querySelectorAll(".gamemode .option");
    this.gamemode_options.forEach((option) => option.addEventListener("click", this.changeGamemodeOption.bind(this)));

    // player
    this.player_id = 0;
    this.player_options = this.step2.querySelectorAll(".player .option");
    this.player_options.forEach((option) => option.addEventListener("click", this.changePlayerOption.bind(this)));

    // type
    this.type_options = this.step2.querySelectorAll(".type .option");
    this.type_options.forEach((option, id) => {
      option.addEventListener("click", (evt) => {
        switch (this.gamemode_id) {
          case 0: this.game = new Standard(this.versus_id, !this.player_id, !id); break;
          case 1: this.game = new Other1(this.versus_id, !this.player_id, !id); break;
          case 2: this.game = new Other2(this.versus_id, !this.player_id, !id); break;
        }

        this.hide();
      });
    });
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
  }

  changeVersusOption(evt) {
    const option = evt.currentTarget;
    this.versus_options.forEach((option) => option.classList.remove("active"));
    option.classList.add("active");
    this.versus_message.innerText = option.dataset.message;
    this.versus_id = +option.dataset.id;
  }

  changeGamemodeOption(evt) {
    this.step1.style.display = "none";
    this.step2.style.display = null;
    this.gamemode_id = +evt.currentTarget.dataset.id;
  }

  changePlayerOption(evt) {
    const option = evt.currentTarget;
    this.player_options.forEach((option) => option.classList.remove("active"));
    option.classList.add("active");
    this.player_id = +option.dataset.id;
  }
}
