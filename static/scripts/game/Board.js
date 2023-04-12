"use strict";

class Board {
  constructor(size, tile_click_callback) {
    this.container = document.querySelector(".board");
    this.tile_click_callback = tile_click_callback;
    this.size = size;

    this.container.style.gridTemplateColumns = `repeat(${this.size}, ${21 / this.size}rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.size}, ${21 / this.size}rem)`;
    this.container.style.gap = `${1.5 / this.size}rem`;
    
    this.createTiles();
    this.createStrokes();
  }

  block() {
    this.container.classList.add("blocked");
  }

  createTiles() {
    this.tiles = [];

    for (let i = 0; i < this.size; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.size; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.addEventListener("click", () => this.tile_click_callback(i, j));
        this.container.appendChild(tile);

        this.tiles[i].push(tile);
      }
    }
  }

  createStrokes() {
    const strokes_types = ["horizontal", "vertical", "diagonal-left-to-right", "diagonal-right-to-left"];
    this.strokes = [];

    for (let i = 0; i < strokes_types.length; i++) {
      const stroke = document.createElement("div");
      stroke.className = `stroke ${strokes_types[i]}`;
      this.container.appendChild(stroke);
      this.strokes.push(stroke);
    }
  }

  placeMark(x, y, mark) {
    this.tiles[x][y].innerText = mark;
  }

  removeMark(x, y) {
    this.tiles[x][y].innerText = "";
  }

  lightUpTile(x, y, color) {
    this.tiles[x][y].style.background = color;
  }

  resetLightUps() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) this.tiles[i][j].style.background = null;
    }
  }

  drawHorizontalStroke(id) {
    this.strokes[0].classList.add(`draw`);
    this.strokes[0].style.top = `${21 / (2 * this.size) - 0.25}rem`;
    this.strokes[0].style.transform = `translateY(${id * 22.5 / this.size}rem)`;
  }

  drawVerticalStroke(id) {
    this.strokes[1].classList.add(`draw`);
    this.strokes[1].style.left = `${(21 / (2 * this.size)) + 0.25}rem`;
    this.strokes[1].style.transform = `translateX(${id * 22.5 / this.size}rem) rotate(90deg)`;
  }

  drawDiagonalStroke(id) {
    this.strokes[id + 2].classList.add(`draw`);
  }
}
