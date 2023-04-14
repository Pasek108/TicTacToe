"use strict";

class Menu {
  constructor() {
    this.container = document.querySelector(".menu");
    this.step1 = this.container.querySelector(".step1");
    this.step2 = this.container.querySelector(".step2");

    // versus
    this.versus_id = 0;
    this.versus_messages = this.step1.querySelectorAll("h2 .message");
    this.versus_options = this.step1.querySelectorAll(".versus .option");
    this.versus_options.forEach((option) => option.addEventListener("click", this.changeVersusOption.bind(this)));

    // gamemode
    this.gamemode_id = 0;
    this.gamemode_options = this.step1.querySelectorAll(".gamemode .option");
    this.gamemode_options.forEach((option) => option.addEventListener("click", this.setGamemode.bind(this)));

    // player
    this.player_id = 0;
    this.player_options = this.step2.querySelectorAll(".player .option");
    this.player_options.forEach((option) => option.addEventListener("click", this.changePlayerOption.bind(this)));

    // type
    this.type_options = this.step2.querySelectorAll(".type .option");
    this.type_options.forEach((option) => option.addEventListener("click", this.loadGame.bind(this)));
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
    
    this.step1.style.display = null;
    this.step2.style.display =  "none";
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

    this.step1.style.display = "none";
    this.step2.style.display = null;
  }

  changePlayerOption(evt) {
    const option = evt.currentTarget;
    this.player_id = +option.dataset.id;

    this.player_options.forEach((option) => option.classList.remove("active"));
    option.classList.add("active");
  }

  loadGame(evt) {
    const option = evt.currentTarget;
    const maximalize = !+option.dataset.id;

    switch (this.gamemode_id) {
      case 0: this.game = new NormalMode(this.versus_id, this.player_id, maximalize); break;
      case 1: this.game = new MovableMode(this.versus_id, this.player_id, maximalize); break;
      case 2: this.game = new OneMarkMode(this.versus_id, this.player_id, maximalize); break;
    }

    this.hide();
  }
}

const menu = new Menu();
