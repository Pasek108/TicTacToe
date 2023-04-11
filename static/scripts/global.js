"use strict";

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Language {
  constructor() {
    this.container = document.querySelector(".language");
    this.container.addEventListener("click", () => this.container.classList.toggle("active"));

    this.active_lang_img = this.container.querySelector(".active-lang-img");

    this.languages = this.container.querySelectorAll(".languages-list div");
    this.languages.forEach((lang) => lang.addEventListener("click", this.changeLanguage.bind(this)));
  }

  changeLanguage(evt) {
    const lang_img = evt.currentTarget.querySelector("img");
    this.active_lang_img.src = lang_img.src;
    this.active_lang_img.alt = lang_img.alt;
  }
}

new Language();
