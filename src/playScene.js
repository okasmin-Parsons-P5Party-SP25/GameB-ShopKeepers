import { canvasDims } from "./utilities.js";

export function enter() {}

export function update() {}

export function draw() {
  background("antiquewhite");

  const groundHeight = 40;

  // draw ground
  push();
  fill("black");
  rect(0, canvasDims.height - groundHeight, canvasDims.width, groundHeight);
  pop();

  // draw ball
  push();
  fill("green");
  ellipse(100, canvasDims.height - groundHeight - 50, 100, 100);
  pop();
}

export function mousePressed() {
  //   changeScene(scenes.title);
}
