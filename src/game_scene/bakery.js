import { modes, bakeryUpgradeImages } from "../utilities.js";
import { drawInventory, drawShelves, drawBox, drawWindow } from "./shapes.js";

export function drawBakery(x, y, level, upgrades, inventory) {
  let shopW, shopH, shopL;

  if (level === 1) {
    [shopW, shopH, shopL] = [150, 180, 40];
  } else if (level === 2) {
    [shopW, shopH, shopL] = [180, 200, 60];
  } else {
    [shopW, shopH, shopL] = [200, 220, 80];
  }

  // Draw the back
  drawBox(x, y, shopW, shopH, shopL);

  // Draw middle elements
  // fill("tan");
  // rect(x + 50, y - 120, 20, 20);

  // Draw the front
  const shelves = drawBakeryFront(x, y, shopW, shopH);

  // Draw inventory
  drawInventory(shelves, inventory);

  //Draw upgrades
  drawBakeryUpgrades(upgrades, x, y, shopW, shopH, shopL);
}

function drawBakeryFront(x, y, shopW, shopH) {
  const windowW = shopW / 2 + 20;
  const windowH = shopH / 3;

  // Base
  drawBox(x + windowW + 10, y, windowW, 20, 20, modes.BACK_CORNER);

  // Below window shelves
  let shelves = drawShelves(x + 10, y - 30, 2, 2, 5, windowW, 50, 10);
  drawWindow(x + 10, y - 40 - 50, windowW, windowH, 40, modes.BOTTOM_CORNER);

  // Side shelves
  const shelves2 = drawShelves(
    x + windowW + 20,
    y - (windowH + 60) / 2,
    4,
    1,
    5,
    shopW - windowW - 30,
    windowH + 60,
    10
  );

  shelves = [...shelves, ...shelves2];

  // Text
  fill("tan");
  text("B  A  K  E  R  Y", x + shopW / 2 - 40, y - shopH + 25);

  return shelves;
}

function drawBakeryUpgrades(upgrades, x, y, shopWidth, shopHeight, shopLength) {
  const decorImgSize = shopWidth * 1.5;
  const upgradeY = y - shopHeight - shopLength;
  if (upgrades[2]) {
    let imgNum = 1;
    if (frameCount % 40 > 30) {
      imgNum = 2;
    } else if (frameCount % 40 > 20) {
      imgNum = 3;
    } else if (frameCount % 40 > 10) {
      imgNum = 2;
    }

    imageMode(CENTER);
    image(
      bakeryUpgradeImages.pet[`cat${imgNum}`],
      x + shopWidth,
      y - 10,
      decorImgSize / 2,
      decorImgSize / 2
    );
  }
  // decor
  if (upgrades[1] === true) {
    for (const [name, img] of Object.entries(bakeryUpgradeImages.decor)) {
      if (name !== "roof" && name !== "menu") {
        image(img, x, upgradeY + 20, decorImgSize, decorImgSize);
      }
    }
    image(
      bakeryUpgradeImages.decor.roof,
      x,
      y - shopHeight - shopLength - 10,
      decorImgSize,
      decorImgSize
    );
    image(
      bakeryUpgradeImages.decor.menu,
      x - 20,
      y - (shopHeight * 3) / 2 + 25,
      decorImgSize,
      decorImgSize
    );
  }
  // light
  if (upgrades[0] === true) {
    blendMode(BLEND);
    image(bakeryUpgradeImages.light.signLight, x, upgradeY - 30, decorImgSize, decorImgSize);
    if ((frameCount * 0.1) % 4 < 2) {
      push();
      blendMode(DODGE);
      image(bakeryUpgradeImages.light.sign, x, upgradeY - 30, decorImgSize, decorImgSize);
      pop();
    }
  }
}
