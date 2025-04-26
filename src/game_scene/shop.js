//     drawShop(i * 300, groundHeight, shopType, 0, [], { bread: 3, cookie: 2, croissant: 1 });

import { drawBakery } from "./bakery.js";
import { drawBookShop } from "./books.js";
import { drawPlantShop } from "./plants.js";
import { shopTypes } from "../utilities.js";
export function drawShop(x, y, type, level, upgrades, inventory) {
  if (type === shopTypes.plant) {
    drawPlantShop(x, y, level, upgrades, inventory);
  } else if (type === shopTypes.books) {
    drawBookShop(x, y, level, upgrades, inventory);
  } else {
    drawBakery(x, y, level, upgrades, inventory);
  }
}

export function addTexture(speckleTexture, textureImg) {
  push();
  addFlecks();
  imageMode(CORNER);

  blendMode(MULTIPLY);
  tint(255, 100);
  image(speckleTexture, 0, 0, width, height);

  blendMode(SOFT_LIGHT);
  tint(195, 124, 93, 120); // reddish
  image(textureImg, 0, 0, width, height);
  pop();
}

function addFlecks() {
  push();
  angleMode(DEGREES);
  strokeWeight(0.3);
  stroke("white");

  const fleckLen = 5;
  const nZoom = 0.1;
  const fleckSpeed = 0.001;
  const numFlecks = 100;
  const cols = numFlecks / 2;
  const colSize = width / cols;
  const rows = numFlecks / 2;
  const rowSize = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * colSize;
      let y = j * rowSize;
      const n = noise(x * nZoom, y * nZoom, frameCount * fleckSpeed);
      x += (n - 0.5) * width;
      y += (n - 0.5) * height;
      const angle = 360 * n;

      push();
      translate(x, y);
      rotate(angle);
      line(0, 0, fleckLen * n, 0);
      pop();
    }
  }
  pop();
}
