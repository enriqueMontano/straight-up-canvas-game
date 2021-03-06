class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = 32;
    this.height = 48;

    this.keys = {
      arrowUp: false,
      arrowRight: false,
      arrowDown: false,
      arrowLeft: false,
      space: false,
    };

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image = new Image();
    this.image.src = './img/ship.png';
    this.rightImage = new Image();
    this.rightImage.src = './img/ship-right.png';
    this.leftImage = new Image();
    this.leftImage.src = './img/ship-left.png';

    this.framesIndex = 0;
    this.frames = 2;

    this.x = gameWidth / 2;
    this.y = gameHeight - 100;
    this.speed = 4;

    this.bullets = [];

    this.setListeners();

    this.sound = new Audio();
    this.sound.src = './audio/shoot.mp3';
    this.collisionSound = new Audio();
    this.collisionSound.src = './audio/player explosion.mp3';
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      0,
      this.framesIndex * Math.floor(this.image.height / this.frames),
      this.image.width,
      Math.floor(this.image.height / this.frames),
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.clearBullets();
    this.bullets.forEach((bullet) => bullet.draw(framesCounter));
    this.animate(framesCounter);
    this.move();
  }

  move() {
    if (this.keys.arrowUp && this.y + this.gameHeight >= this.gameHeight) {
      this.y -= this.speed;
    }
    if (this.keys.arrowRight && this.x < this.gameWidth - this.width) {
      this.x += this.speed;
    }
    if (this.keys.arrowDown && this.y < this.gameHeight - this.width) {
      this.y += this.speed;
    }
    if (this.keys.arrowLeft && this.x + this.gameWidth >= this.gameWidth) {
      this.x -= this.speed;
    }
    this.bullets.forEach((bullet) => bullet.move());
  }

  // animate(framesCounter) {
  //   if (framesCounter % 5 === 0) this.framesIndex++
  //   if (this.framesIndex > 1) this.framesIndex = 0
  // }

  animate(framesCounter) {
    if (framesCounter % 5 === 0 && this.keys.arrowRight === true) {
    } else if (framesCounter % 5 === 0 && this.keys.arrowLeft === true) {
    } else if (framesCounter % 5 === 0) {
      this.framesIndex++;
      if (this.framesIndex > 1) this.framesIndex = 0;
    }
  }

  setListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.keys.arrowLeft = true;
      }
      if (e.keyCode === 39) {
        this.keys.arrowRight = true;
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.keys.arrowLeft = false;
      }
      if (e.keyCode === 39) {
        this.keys.arrowRight = false;
      }
    });
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === 38) {
        this.keys.arrowUp = true;
      }
      if (e.keyCode === 40) {
        this.keys.arrowDown = true;
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 38) {
        this.keys.arrowUp = false;
      }
      if (e.keyCode === 40) {
        this.keys.arrowDown = false;
      }
    });
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === 32) {
        this.keys.space = true;
        this.shoot();
        this.sound.play();
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 32) {
        this.keys.space = false;
      }
    });
  }

  shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        10,
        26,
        './img/laser-bolt-2.png',
        this.x,
        this.y,
        this.width,
        this.height,
        4,
        'player'
      )
    );
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.height >= this.height
    );
  }
}
