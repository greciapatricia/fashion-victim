class BackgroundTwo {
    constructor(ctx) {
      this.ctx = ctx;
  
      this.x = 0;
      this.y = 0;
  
      this.width = 1390;
      this.height = this.ctx.canvas.height;
  
      this.vx = -2;
  
      this.img = new Image();
      this.img.src = "./images/back-magazines.png";
      this.img.isReady = false;
      this.img.onload = () => {
        this.img.isReady = true;
      };
  
      this.movements = {
        right: false,
        left: false,
      };
    }
  
    isReady() {
      return this.img.isReady;
    }
  
    draw() {
      if (this.isReady()) {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(
          this.img,
          this.x + this.width,
          this.y,
          this.width,
          this.height
        );
        this.ctx.drawImage(
          this.img,
          this.x - this.width,
          this.y,
          this.width,
          this.height
        );
      }
    }
  
    move() {
      if (this.movements.right) {
        this.x += this.vx;
  
      }
  
      if (this.movements.left) {
        this.x -= this.vx;
       
      }
    }
    onKeyEvent(event) {
      const status = event.type === "keydown";
  
      switch (event.keyCode) {
        case KEY_RIGHT:
          this.movements.right = status;
          break;
        case KEY_LEFT:
          this.movements.left = status;
          break;
  
        default:
          break;
      }
    }
  }