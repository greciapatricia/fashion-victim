class WrongMagazine {
    constructor(ctx, x, y, vy) {
      this.ctx = ctx;
  
      this.x = x;
      this.y = y;
  
      this.width = 70;
      this.height = 98;
  
      this.vy = vy;
  
      const images = [
        "./images/obstacles/magazines/conde-nast.png",
        "./images/obstacles/magazines/esquire.png",
        "./images/obstacles/magazines/forbes.png",
        "./images/obstacles/magazines/national-geographic.png",
        "./images/obstacles/magazines/new-yorker.png",
        "./images/obstacles/magazines/time.png"
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