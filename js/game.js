class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 500;
    this.canvas.height = 700;
  }

  start() {
    this.clear();
    this.move();
    this.draw();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.background.draw();
  }
}
