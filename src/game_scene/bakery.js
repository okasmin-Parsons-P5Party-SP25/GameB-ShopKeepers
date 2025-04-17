import { modes, shelfColor } from "../utilities.js";
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
  fill("red");
  // rect(x + 50, y - 120, 20, 20);

  // Draw the front
  const shelves = drawBakeryFront(x, y, shopW, shopH);

  // Draw inventory
  drawInventory(shelves, inventory);
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
  fill(shelfColor.back);
  text("B  A  K  E  R  Y", x + shopW / 2 - 40, y - shopH + 25);

  return shelves;
}
