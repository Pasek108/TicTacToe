"use strict";

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const info = document.querySelector(".info");
const info_button = document.querySelector(".info-button");
info_button.addEventListener("click", () => {
  if (info.classList.contains("active")) {
    info_button.innerHTML = '<i class="fa-solid fa-info"></i>';
    info.classList.remove("active");
    return;
  } 

  info_button.innerHTML = 'X';
  info.classList.add("active");
})
