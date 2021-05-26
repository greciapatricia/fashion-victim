class Obstacle {
  constructor(ctx, x, y, vy) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.width = 50;
    this.height = 50;

    this.vy = vy;

    const images = [
      "./images/obstacles/logo.png",
      "./images/arrows.png",
      "./images/cutegirl.sprite.png",
    ];
    this.img = new Image();
    this.img.src = randomItem(images);

    function randomItem(arr) {
      const randomPosition = Math.floor(Math.random() * arr.length);
      let img = arr[randomPosition];

      return img;
    }
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.vy;

    if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }
  }
}
