class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 695;
    this.canvas.height = 600;

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.background = new Background(this.ctx);
  }

  start() {
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
      }, this.fps);
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
   
    this.background.draw();
  }

  move() {
  
      this.background.move()
     
  }

  onKeyEvent(event) {
    
    this.background.onKeyEvent(event)
   
  }
}
