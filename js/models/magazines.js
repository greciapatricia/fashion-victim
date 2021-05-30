class Magazine {
    constructor(ctx, x, y, vy) {
      this.ctx = ctx;
  
      this.x = x;
      this.y = y;
  
      this.width = 70;
      this.height = 98;
  
      this.vy = vy;
  
      const images = [
        "./images/magazines/allure.png",
        "./images/magazines/bof.png",
        "./images/magazines/cosmopolitan.png",
        "./images/magazines/elle.png",
        "./images/magazines/harpers-bazaar.png",
        "./images/magazines/in-style.png",
        "./images/magazines/v.png",
        "./images/magazines/vogue.png",
        "./images/magazines/w.png"
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