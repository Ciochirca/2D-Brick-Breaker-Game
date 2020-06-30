export default class Paddle {

  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width  = 150;
    this.height = 30;
    this.maxSpeed = 7;
    this.speed = 0;

    //set position of the paddle in the middle of the game screen
    this.position = {
      x: game.gameWidth/2 - this.width/2,
      y: game.gameHeight - this.height - 10,
    }
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }
  draw(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {

    this.position.x += this.speed;

    //keeps the paddle in our game screen
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;

  }

}