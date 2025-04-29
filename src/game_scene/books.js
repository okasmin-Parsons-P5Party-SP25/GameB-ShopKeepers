import { modes, shelfColor } from "../utilities.js";
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
  drawBox(x, y, shopWidth, shopHeight, shopLength);
  const shelves = drawBookShopFront(x, y, shopWidth, shopHeight, shopLength);
  drawInventory(shelves, inventory);
}
function drawBookShopFront(x, y, shopWidth, shopHeight, shopLength) {
  const stairHeight = 40;
  const stairDepth = 20;
  const sideWidth = shopWidth / 2;
  const sideHeight = shopHeight - stairHeight - 50;
  const sideDepth = 40;

  const shelves = drawShelves(
    x + sideWidth + 20,
    y - sideHeight / 2 - 10,
    6,
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

  fill(shelfColor.back);
  text("B  O  O  K  S", x + shopWidth / 2 - 30, y - shopHeight + 25);
  return shelves;
}
