class Bullet {
  constructor(
    ctx,
    width,
    height,
    image,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.posX = (playerWidth - 5) / 2 + playerX;
    this.posY = playerY - playerHeight;
    this.vY = 3;

    this.framesIndex = 0;
    this.frames = 2;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.animate(framesCounter);
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++;
    if (this.framesIndex > 1) this.framesIndex = 0;
  }

  move() {
    this.posY -= this.vY;
  }
}
