class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 695;
    this.canvas.height = 600;

    this.fps = 1000 / 60;
    this.drawInterval = undefined;

    this.cutegirl = new Cutegirl(this.ctx, 20, this.canvas.height - 97);
    this.background = new Background(this.ctx);
  }

  start() {
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, this.fps);
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.background.draw();
    this.cutegirl.draw();

  }

  move() {
    
      this.background.move();
    
    this.cutegirl.move();
  }

  onKeyEvent(event) {
    this.cutegirl.onKeyEvent(event);
    this.background.onKeyEvent(event);
  }
}
