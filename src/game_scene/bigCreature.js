import { dudeImages, canvasDims } from "../utilities.js";
export const drawBigCreature = () => {
  push();
  rectMode(CENTER);
  rect(
    canvasDims.width / 2,
    canvasDims.height / 2,
    canvasDims.width * 0.75,
    (canvasDims.height / 2) * 0.75
  );
  image(dudeImages[0], canvasDims.width / 2, canvasDims.height / 2, 40, 70);
  stroke("black");
  textAlign(CENTER);
  textFont("Courier New", 30);
  textStyle(BOLD);
  text(
    "click to play the quiz and win more coins!",
    canvasDims.width / 2,
    canvasDims.height / 2 - 50
  );
  pop();
};
