"use strict";

class Board {
  constructor(size, tile_click_callback) {
    this.container = document.querySelector(".board");
    this.tile_click_callback = tile_click_callback;
    this.size = size;

    this.container.style.gridTemplateColumns = `repeat(${this.size}, ${21 / this.size}rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.size}, ${21 / this.size}rem)`;
    
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

  drawHorizontalStroke(id) {
    this.strokes[0].classList.add("draw");
    if (id == 0) this.strokes[0].classList.add("top");
    if (id == 2) this.strokes[0].classList.add("bot");
  }

  drawVerticalStroke(id) {
    this.strokes[1].classList.add("draw");
      if (id == 0) this.strokes[1].classList.add("left");
      if (id == 2) this.strokes[1].classList.add("right");
  }

  drawDiagonalStroke(id) {
    this.strokes[id + 2].classList.add("draw");
  }
}
