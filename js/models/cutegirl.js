class Cutegirl {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.width = 0;
    this.height = 0;

    this.minX = 50;
    this.maxX = this.ctx.canvas.width - 120;

    this.vx = 0;

    this.img = new Image();
    this.img.src = "./images/cutegirl.sprite.png";
    this.img.isReady = false;

    this.img.horizontalFrames = 20;
    this.img.verticalFrames = 1;
    this.img.horizontalFrameIndex = 0;
    this.img.verticalFrameIndex = 0;

    this.img.drawCount = 0;

    this.img.onload = () => {
      this.img.isReady = true;
      this.img.frameWidth = Math.floor(
        this.img.width / this.img.horizontalFrames
      );
      this.img.frameHeight = Math.floor(
        this.img.height / this.img.verticalFrames
      );
      this.width = this.img.frameWidth;
      this.height = this.img.frameHeight;
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
      this.ctx.drawImage(
        this.img,
        this.img.horizontalFrameIndex * this.img.frameWidth,
        this.img.verticalFrameIndex * this.img.frameHeight,
        this.img.frameWidth,
        this.img.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      this.img.drawCount++;
      
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

  move() {
    if (this.movements.right) {
      this.vx = SPEED;
    } else if (this.movements.left) {
      this.vx = -SPEED;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;

    if (this.x >= this.maxX) {
      this.x = this.maxX;
    } else if (this.x <= this.minX) {
      this.x = this.minX;
    }
  }

  animate() {
    if (this.movements.right || this.movements.left) {
      this.animateSprite();
    } else {
      this.resetAnimation();
    }
  }

  resetAnimation() {
    this.img.horizontalFrameIndex = 0;
    this.img.verticalFrameIndex = 0;
  }

  animateSprite() {

    if (this.img.verticalFrameIndex !== 1) {
      this.img.verticalFrameIndex = 1;
      this.img.horizontalFrameIndex = 0;
    } else if (this.img.drawCount % MOVEMENT_FRAMES === 0) {
      if (this.img.horizontalFrameIndex >= this.img.horizontalFrames - 1) {
        this.img.horizontalFrameIndex = 0;
      } else {
        this.img.horizontalFrameIndex++;
      }
      this.img.drawCount = 0;
    }
  }
}
