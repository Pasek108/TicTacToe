"use strict";

class Language {
  constructor() {
    this.container = document.querySelector(".language");
    this.container.addEventListener("click", () => this.container.classList.toggle("active"));

    this.active_lang_img = this.container.querySelector(".active-lang-img");

    this.languages = this.container.querySelectorAll(".languages-list div");
    this.languages.forEach((lang) => lang.addEventListener("click", this.changeLanguage.bind(this)));

    this.loadLanguage();
  }

  changeLanguage(evt) {
    const lang_img = evt.currentTarget.querySelector("img");
    this.active_lang_img.src = lang_img.src;
    this.active_lang_img.alt = lang_img.alt;
    document.documentElement.lang = evt.currentTarget.dataset.lang;
    localStorage.setItem("language", evt.currentTarget.dataset.lang);
  }

  loadLanguage() {
    if (localStorage.getItem("language") == null) localStorage.setItem("language", "pl");

    this.container.click();

    switch (localStorage.getItem("language")) {
      case "pl": this.languages[0].click(); break;
      case "en": this.languages[1].click(); break;
    }
  }
}

new Language();
