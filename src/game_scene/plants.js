import { modes, shelfColors } from "../utilities.js";
import { drawInventory, drawShelves, drawBox, drawBoxInset } from "./shapes.js";

export function drawPlantShop(x, y, level, upgrades, inventory) {
  let shopWidth, shopHeight, shopLength;
  if (upgrades.length === 0) {
    [shopWidth, shopHeight, shopLength] = [150, 180, 40];
  } else if (upgrades.length === 1) {
    [shopWidth, shopHeight, shopLength] = [180, 200, 60];
  } else {
    [shopWidth, shopHeight, shopLength] = [220, 220, 80];
  }
  const shelves = drawPlantShopFront(x, y, shopWidth, shopHeight, shopLength);
  drawInventory(shelves, inventory);
}
