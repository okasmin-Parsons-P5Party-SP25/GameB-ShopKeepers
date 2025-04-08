import { changeScene, scenes } from "./main.js";

export function enter() {}

export function update() {}

export function draw() {
  background("antiquewhite");

  // draw info
  push();
  fill("black");
  text("play scene", 10, 20);
  pop();

  // draw ball
  push();
  fill("green");
  ellipse(100, 100, 100, 100);
  pop();
}

export function mousePressed() {
  //   changeScene(scenes.title);
}
