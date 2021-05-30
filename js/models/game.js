class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 695;
    this.canvas.height = 600;

    this.fps = 1000 / 60;
    this.drawInterval = undefined;

    this.cutegirl = new Cutegirl(this.ctx, 20, this.canvas.height - 97);

    this.level = 1;
    this.obstacles = [];
    this.benefits = [];

    this.framesCount = 0;

    this.background = new Background(this.ctx);
    this.points = 10;

    const theme = new Audio("./sound/theme.mp3");
    theme.volume = 0.1;

    const benefitPoint = new Audio(
      "./sound/mixkit-retro-game-notification-212.wav"
    );
    benefitPoint.volume = 0.05;

    const obstaclePoint = new Audio("./sound/mixkit-losing-bleeps-2026.wav");
    obstaclePoint.volume = 0.05;

    const winner = new Audio("./sound/mixkit-medium-size-crowd-applause-485.wav");
    winner.volume = 1;

    const loser = new Audio("./sound/mixkit-arcade-retro-game-over-213.wav");
    loser.volume = 1;

    this.sounds = {
      theme,
      benefitPoint,
      obstaclePoint,
      winner,
      loser,
    };
  }

  start() {
    if (!this.drawInterval) {
      this.sounds.theme.play();
      this.drawInterval = setInterval(() => {
        this.clear();
        this.move();
        this.draw();

        this.checkCollisions();
        this.framesCount++;

        if (this.framesCount % OBSTACLES_FRAMES === 0) {
          this.addElements();
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
    this.benefits.forEach((benefit) => benefit.draw());

    this.ctx.font = "28px myFirstFont";
    this.ctx.fillStyle = "#ffeb3b";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.points, 650, 50);
    this.ctx.fillText(this.level, 150, 50);

    this.ctx.font = "18px myFirstFont";
    this.ctx.fillText("Points:", 550, 50);
    this.ctx.fillText("Level:", 70, 50);
  }

  move() {
    this.background.move();
    this.cutegirl.move();
    this.obstacles.forEach((obstacle) => obstacle.move());
    this.benefits.forEach((benefit) => benefit.move());
  }

  onKeyEvent(event) {
    this.cutegirl.onKeyEvent(event);
    this.background.onKeyEvent(event);
  }

  addElements() {
    const randomPosObstacles = Math.floor(Math.random() * this.canvas.width);
    const randomPosBenefits = Math.floor(Math.random() * this.canvas.width);

    if (this.level === 1) {
      this.benefits.push(new Brand(this.ctx, randomPosBenefits, 0, SPEED));
      this.obstacles.push(
        new WrongBrand(this.ctx, randomPosObstacles, 0, OBSTACLES_SPEED)
      );
    } else if (this.level === 2) {
      this.benefits.push(new Magazine(this.ctx, randomPosBenefits, 0, SPEED_2));
      this.obstacles.push(
        new WrongMagazine(this.ctx, randomPosObstacles, 0, OBSTACLES_SPEED_2)
      );
    } else if (this.level === 3) {
      this.benefits.push(new City(this.ctx, randomPosBenefits, 0, SPEED_3));
      this.obstacles.push(
        new WrongCity(this.ctx, randomPosObstacles, 0, OBSTACLES_SPEED_3)
      );
    }
  }

  gameOver() {
    clearInterval(this.drawInterval);

    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "28px myFirstFont";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.font = "18px myFirstFont";
    this.ctx.fillText(
      "You clearly don't know",
      this.canvas.width / 2,
      this.canvas.height / 2 + 30
    );
    this.ctx.fillText(
      "anything about fashion!",
      this.canvas.width / 2,
      this.canvas.height / 2 + 60
    );
    this.ctx.restore();
  }

  youWin() {
    clearInterval(this.drawInterval);

    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "28px myFirstFont";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "You are so IN!",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.font = "18px myFirstFont";
    this.ctx.fillText(
      "You clearly know",
      this.canvas.width / 2,
      this.canvas.height / 2 + 30
    );
    this.ctx.fillText(
      "a lot about fashion!",
      this.canvas.width / 2,
      this.canvas.height / 2 + 60
    );

    this.ctx.restore();
  }

  levelTwo() {
    this.background = new BackgroundTwo(this.ctx);
    this.level = 2;
  }

  levelThree() {
    this.background = new BackgroundThree(this.ctx);
    this.level = 3;
  }

  checkCollisions() {
    const collideObstacle = this.obstacles.some((obstacle) =>
      this.cutegirl.collidesWith(obstacle)
    );

    const collideBenefit = this.benefits.some((benefit) =>
      this.cutegirl.collidesWith(benefit)
    );

    const restBenefits = this.benefits.filter(
      (benefit) => !this.cutegirl.collidesWith(benefit)
    );

    const restObstacles = this.obstacles.filter(
      (obstacle) => !this.cutegirl.collidesWith(obstacle)
    );

    const newPoints = (this.benefits.length - restBenefits.length) * 10;
    const lessPoints = (this.obstacles.length - restObstacles.length) * -10;

    if (collideObstacle) {
      this.sounds.obstaclePoint.play();
      this.points += lessPoints;
      this.obstacles = restObstacles;
    } else if (collideBenefit) {
      this.sounds.benefitPoint.play();
      this.points += newPoints;
      this.benefits = restBenefits;
    } else if (this.points === 50) {
      this.levelTwo();
    } else if (this.points === 100) {
      this.levelThree();
    } else if (this.points === 20) {
      this.youWin();
      this.sounds.theme.pause();
      this.sounds.winner.play();
    } else if (this.points === 0) {
      this.gameOver();
      this.sounds.theme.pause();
      this.sounds.loser.play();
    }
  }
}
