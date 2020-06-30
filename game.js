//import needed classes
import Paddle from "/paddle.js";
import InputHandler from "/input.js";
import Ball from "/ball.js";
import Brick from "/brick.js";
import {buildLevel, level1, level2} from "/levels.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4
};

export default class Game {

  constructor(gameWidth, gameHeight) {

    this.lives = 1;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.gameState = GAME_STATE.MENU;
    this.bricks = [];
    this.levels = [level1, level2];
    this.currentLevel = 0;

    //create player paddle
    this.paddle = new Paddle(this);

    //create ball
    this.ball = new Ball(this);

    //instantiate input handler
    new InputHandler(this.paddle, this);

  }

  start() {

    //only the menu must trigger the game to start
    if (this.gameState !== GAME_STATE.MENU 
      && this.gameState !== GAME_STATE.NEW_LEVEL) return;

    //create bricks
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);

    //reset the ball
    this.ball.reset();

    //put ball and paddle in an array
    this.gameObjects = [this.ball, this.paddle];

    //change game state when game starts
    this.gameState = GAME_STATE.RUNNING;

  }

  update(deltaTime) {

    //check for game end
    if (this.lives === 0) this.gameState = GAME_STATE.GAME_OVER;

    //don't update if the game is paused, ended or you are in game menu
    if (this.gameState === GAME_STATE.PAUSED
      || this.gameState === GAME_STATE.MENU
      || this.gameState === GAME_STATE.GAME_OVER) return;

    //check if level is completed
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gameState = GAME_STATE.NEW_LEVEL;
      this.start()
    }

    //update game objects
    [...this.gameObjects, ...this.bricks].forEach( obj => obj.update(deltaTime));

    //bricks deletion
    this.bricks = this.bricks.filter(object => !object.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach( obj => obj.draw(ctx));

    //drawing pause screen
    if (this.gameState == GAME_STATE.PAUSED) {

      //shade the screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      //show text that indicates a pause
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);

    }

    //drawing menu screen
    if (this.gameState == GAME_STATE.MENU) {

      //shade the screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      //show text that indicates a pause
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press space bar to start", this.gameWidth/2, this.gameHeight/2);

    }

    //drawing end game screen
    if (this.gameState == GAME_STATE.GAME_OVER) {

      //shade the screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      //show text that indicates a pause
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2);

    }

  }

  togglePause() {

    if (this.gameState == GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }

  }

}