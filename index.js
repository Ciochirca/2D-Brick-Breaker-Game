//import needed classes
import Game from "/game.js";

//global variables
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

//constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

//clearing the screen
ctx.clearRect(0, 0, 800, 600);

//create game
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

//game loop
let lastTime = 0;
function gameLoop(timeStamp) {

  //calculates how much time has passed
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  //clears the screen and draws everything
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  //call gameLoop with the next frame's time stamp 
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);