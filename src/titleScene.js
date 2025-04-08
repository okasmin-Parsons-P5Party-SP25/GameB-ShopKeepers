import { changeScene, scenes } from "./main.js";

export function draw() {
  background("black");

  // draw info
  push();
  fill("white");
  text("title scene", 10, 20);
  pop();

  // draw title
  push();
  fill("black");
  textSize(50);
  textAlign(CENTER, CENTER);
  text("title", width * 0.5, height * 0.5);
  pop();
}

export function mousePressed() {
  //   changeScene(scenes.play);
}
