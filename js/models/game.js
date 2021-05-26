class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 695;
    this.canvas.height = 600;

    this.fps = 1000 / 60;
    this.drawInterval = undefined;

    this.cutegirl = new Cutegirl(this.ctx, 20, this.canvas.height - 97);

    this.obstacles = [];
    this.brands = [];
    this.framesCount = 0;

    this.background = new Background(this.ctx);
    this.points = 0;
  }

  start() {
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        this.clear();
        this.move();
        this.draw();

        this.checkCollisions();
        this.framesCount++;

        if (this.framesCount % OBSTACLES_FRAMES === 0) {
          this.addObstacles();
          this.addBrands();
        }
      }, this.fps);
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.background.draw();
    this.cutegirl.draw();
    this.obstacles.forEach((obstacle) => obstacle.draw());
    this.brands.forEach((brand) => brand.draw());

    this.ctx.font = "28px myFirstFont";
    this.ctx.fillStyle = "#ffeb3b";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.points, 650, 50);

    this.ctx.font = "18px myFirstFont";
    this.ctx.fillText("Points:", 550, 50);
  }

  move() {
    this.background.move();
    this.cutegirl.move();
    this.obstacles.forEach((obstacle) => obstacle.move());
    this.brands.forEach((brand) => brand.move());
  }

  onKeyEvent(event) {
    this.cutegirl.onKeyEvent(event);
    this.background.onKeyEvent(event);
  }

  addObstacles() {
    const randomPosition = Math.floor(Math.random() * this.canvas.width);
    this.obstacles.push(
      new Obstacle(this.ctx, randomPosition, 0, OBSTACLES_SPEED)
    );
  }

  addBrands() {
    const randomPosition = Math.floor(Math.random() * this.canvas.width);
    this.brands.push(new Brand(this.ctx, randomPosition, 0, SPEED));
  }

  gameOver() {
    clearInterval(this.drawInterval);

    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "28px Goblin One";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.restore();
  }

  nextLevel() {
    clearInterval(this.drawInterval);

    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "28px Goblin One";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Next Level",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.restore();
  }



  
  checkCollisions() {
    const collide = this.obstacles.some((obstacle) =>
      this.cutegirl.collidesWith(obstacle)
    );

    const collideBrand = this.brands.some((brand) =>
      this.cutegirl.collidesWith(brand)
    );

    if (collide) {
      this.gameOver();
    } else if (collideBrand) {
      const restBrands = this.brands.filter(
        (brand) => !this.cutegirl.collidesWith(brand)
      );
      const newPoints = (this.brands.length - restBrands.length) * 10;
      this.points += newPoints;

      this.brands = restBrands; 
    } else if (this.points === 100) {
      this.nextLevel()

    }
  }

}
