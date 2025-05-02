import { modes, bookUpgradeImages, angle } from "../utilities.js";
import { drawInventory, drawShelves, drawBox, drawBoxInset } from "./shapes.js";

export function drawBookShop(x, y, level, upgrades, inventory) {
  let shopWidth, shopHeight, shopLength;
  if (level === 0) {
    [shopWidth, shopHeight, shopLength] = [150, 180, 40];
  } else if (level === 1) {
    [shopWidth, shopHeight, shopLength] = [180, 200, 60];
  } else {
    [shopWidth, shopHeight, shopLength] = [220, 220, 80];
  }
  //draw back
  const scaleVal = 1.7;
  const decorX = x + cos(angle) * scaleVal * shopLength + 50;
  const decorY = y - cos(angle) * scaleVal * shopLength - 50;
  const decorW = shopWidth * scaleVal;
  push();
  imageMode(CENTER);
  drawBox(x, y, shopWidth, shopHeight, shopLength);
  if (upgrades[0]) {
    //decor
    image(bookUpgradeImages.decor.sidetree, decorX - 20, decorY, decorW, decorW);
  }
  const shelves = drawBookShopFront(x, y, shopWidth, shopHeight);
  push();
  translate(0, -10);
  drawInventory(shelves, inventory);
  pop();

  if (upgrades[0]) {
    //decor
    image(bookUpgradeImages.decor.door, decorX, decorY, decorW, decorW);
    image(bookUpgradeImages.decor.outdoor, decorX, decorY, decorW, decorW);
    image(bookUpgradeImages.decor.window, decorX, decorY, decorW, decorW);
    image(bookUpgradeImages.decor.roof, decorX, decorY, decorW, decorW);
  }
  if (upgrades[1]) {
    //lights
    blendMode(BLEND);

    image(bookUpgradeImages.light.lightnormal, decorX, decorY, decorW, decorW);
    if (frameCount % 100 > 50) {
      push();
      blendMode(ADD);
      image(bookUpgradeImages.light.lightadd, decorX, decorY, decorW, decorW);
      pop();
    }
  }
  if (upgrades[2]) {
    //pet
    let imgNum = 1;
    if (frameCount % 50 > 40) {
      imgNum = 2;
    } else if (frameCount % 50 > 30) {
      imgNum = 3;
    } else if (frameCount % 50 > 20) {
      imgNum = 2;
    }
    image(bookUpgradeImages.pet[`bird${imgNum}`], x + 50, y - shopHeight, 100, 100);
    pop();
  }
}
function drawBookShopFront(x, y, shopWidth, shopHeight) {
  const stairHeight = 40;
  const stairDepth = 20;
  const sideWidth = shopWidth / 2;
  const sideHeight = shopHeight - stairHeight - 50;
  const sideDepth = 40;

  const shelves = drawShelves(
    x + sideWidth + 20,
    y - sideHeight / 2 - 10,
    4,
    1,
    5,
    shopWidth - sideWidth - 30,
    sideHeight + stairHeight / 2,
    10,
    modes.BOTTOM_CORNER
  );

  drawBoxInset(x + 10, y - stairHeight, sideWidth, sideHeight, sideDepth, modes.BOTTOM_CORNER);
  drawBox(x + 10 + sideWidth, y, sideWidth, stairHeight / 2, stairDepth, modes.BACK_CORNER);
  drawBox(
    x + 10 + sideWidth,
    y - stairHeight / 2,
    sideWidth,
    stairHeight / 2,
    stairDepth / 2,
    modes.BACK_CORNER
  );

  fill("tan");
  text("B  O  O  K  S", x + shopWidth / 2 - 30, y - shopHeight + 25);
  return shelves;
}
