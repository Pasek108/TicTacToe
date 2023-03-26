"use strict";

class Menu {
  constructor() {
    this.container = document.querySelector(".menu");

    this.versus_id = 0;
    this.versus = document.querySelector(".versus");
    this.versus_types = document.querySelectorAll(".versus-type h2");
    this.versus_options = this.versus.querySelectorAll(".option");
    this.versus_options.forEach((option, id) => {
      option.addEventListener("click", () => this.changeVersusOption(id));
    });

    this.gamemodes = document.querySelector(".gamemodes");
    this.gamemodes_options =this.gamemodes.querySelectorAll(".option");
    this.gamemodes_options.forEach((option, gamemode_id) => {
      option.addEventListener("click", () => {
        this.hide();
        
        switch(gamemode_id) {
          case 0: this.game = new Game(this.versus_id, gamemode_id); break;
          case 1: this.game = new Game(this.versus_id, gamemode_id); break;
          case 2: this.game = new Game(this.versus_id, gamemode_id); break;
          case 3: this.game = new Game(this.versus_id, gamemode_id); break;
        }
      });
    });
  }

  show() {
    this.container.style.display = null;
  }

  hide() {
    this.container.style.display = "none";
  }

  changeVersusOption(id) {
    this.versus_options.forEach((option) => option.classList.remove("active"));
    this.versus_types.forEach((type) => type.classList.remove("active"));
  
    this.versus_types[id].classList.add("active");
    this.versus_options[id].classList.add("active");
    
    this.versus_id = id;
  }
}

const menu = new Menu();