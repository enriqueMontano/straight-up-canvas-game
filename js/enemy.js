class Enemy {
  constructor(ctx, width, height, x, velocity) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.sound = new Audio();

    this.frames = 2;
    this.framesIndex = 0;

    this.x = x;
    this.y = 0;

    this.velocity = velocity;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.x,
      this.y - this.height,
      this.width,
      this.height
    );
    this.animate(framesCounter);
    this.move();
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++;
    if (this.framesIndex > 1) this.framesIndex = 0;
  }

  move() {
    this.y += this.velocity;
  }
}

class EasyEnemy extends Enemy {
  constructor(ctx, width, height, x, velocity) {
    super(ctx, width, height, x, velocity);
    this.image.src = './img/enemy-easy.png';
    this.sound.src = './audio/enemy-easy-explosion.mp3';
  }
}

class NormalEnemy extends Enemy {
  constructor(ctx, width, height, x, velocity) {
    super(ctx, width, height, x, velocity);
    this.image.src = './img/enemy-normal.png';
    this.sound.src = './audio/enemy-normal-explosion.mp3';
  }
}

class HardEnemy extends Enemy {
  constructor(ctx, width, height, x, velocity) {
    super(ctx, width, height, x, velocity);
    this.image.src = './img/enemy-hard.png';
    this.sound.src = './audio/enemy-hard-explosion.mp3';
  }
}
