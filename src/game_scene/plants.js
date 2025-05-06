import { modes, angle, shelfColor, plantUpgradeImages } from "../utilities.js";
import { drawInventory, drawShelves, drawBox } from "./shapes.js";
const topheight = 25;
const bottomheight = 60;

export function drawPlantShop(x, y, level, upgrades, inventory) {
  let shopWidth, shopHeight, shopLength;
  let textShift = 0;
  if (level === 0) {
    [shopWidth, shopHeight, shopLength] = [150, 180, 40];
  } else if (level === 1) {
    [shopWidth, shopHeight, shopLength] = [180, 200, 60];
  } else {
    [shopWidth, shopHeight, shopLength] = [220, 220, 80];
    textShift = 24;
  }

  //back wall
  const backwallX = x + shopLength * cos(angle);
  const backwallY = y - shopLength * sin(angle);
  drawBox(backwallX, backwallY, shopWidth, shopHeight, shopLength / 3);

  const padding = 30;
  drawShelves(
    backwallX + padding,
    backwallY - shopHeight / 3,
    2,
    2,
    15,
    shopWidth - padding * 2,
    shopHeight / 3,
    10
  );

  //draw inventory
  const shelves2 = drawPlantShopFront(x, y, shopWidth, shopHeight, shopLength);
  drawInventory(shelves2, inventory);
  blendMode(BLEND);
  fill("tan");
  // textAlign(CENTER);
  text("P L A N T S", x + shopWidth / 2 - 40, y - shopHeight + 15 - textShift);
  imageMode(CORNER);
  //draw upgrades
  let upgradeH;
  const upgradeW = shopWidth * 2.5;
  let upgradex, upgradey;
  //decor
  if (upgrades[0] === true) {
    for (const [name, img] of Object.entries(plantUpgradeImages.decor)) {
      upgradeH = (upgradeW * img.height) / img.width;
      upgradex = x - shopWidth / 2 - 20;
      upgradey = y - upgradeH + 20;
      image(img, upgradex, upgradey, upgradeW, upgradeH);
    }
  }
  // console.log(upgradeH, upgradeW, upgradex, upgradey);
  //light
  if (upgrades[1] === true) {
    const img = plantUpgradeImages.light.lightnormal;
    upgradeH = (upgradeW * img.height) / img.width;
    upgradex = x - shopWidth / 2 - 20;
    upgradey = y - upgradeH + 20;
    upgradeH = (upgradeW * img.height) / img.width;
    // blendMode(MULTIPLY);
    // image(plantUpgradeImages.light.lightshadow, upgradex, upgradey, upgradeW, upgradeH);
    blendMode(BLEND);
    image(plantUpgradeImages.light.lightnormal, upgradex, upgradey, upgradeW, upgradeH);
    if (frameCount % 100 > 20) {
      blendMode(ADD);
      image(plantUpgradeImages.light.lightadd, upgradex, upgradey, upgradeW, upgradeH);
      blendMode(BLEND);
    }
  }
  push();
  if (upgrades[2]) {
    drawBee(x + shopWidth - 50, y - shopHeight - 100, 50, true, shopWidth / 2);
    drawBee(x + shopWidth - 50, y - shopHeight - 100, 20, true, shopWidth / 2);
    drawBee(x + shopWidth + 50, y - shopHeight - 110, 18, false, -shopWidth / 2);
    drawBee(x + shopWidth, y - shopHeight - 120, 11, false, -shopWidth / 3);
    drawBee(x + shopWidth - 80, y - shopHeight - 90, 15, true, 100);
  }
  pop();
}

function drawBee(x, y, size, left, xSpan) {
  push();
  let imgNum = 1;
  const yShift = sin(frameCount * 3) * 15;
  const xShift = sin(frameCount * noise(size)) * xSpan;
  if (frameCount % 20 > 10) {
    imgNum = 2;
  }
  translate(x + xShift, y + yShift);
  if (left) {
    scale(-1, 1);
  }
  image(plantUpgradeImages.pet[`bee${imgNum}`], 0, 0, size, size);
  pop();
}
function drawPlantShopFront(x, y, shopWidth, shopHeight, shopLength) {
  //side boxex
  drawBox(x, y, shopLength / 3, bottomheight, shopLength);
  drawBox(x + shopWidth, y - bottomheight, shopLength / 3, 10, shopLength, modes.TOP_CORNER);

  angleMode(DEGREES);

  //front box
  drawBox(x, y, shopWidth, bottomheight, shopLength / 3);
  const padding2 = 10;
  const shelves2 = drawShelves(
    x + padding2,
    y + padding2,
    1,
    3,
    padding2,
    shopWidth - padding2 * 2,
    bottomheight - padding2 * 2,
    20
  );

  //front poles
  const poleW = 5;
  drawBox(x, y - bottomheight, poleW, shopHeight - bottomheight, poleW);
  drawBox(x + shopWidth - poleW, y - bottomheight, poleW, shopHeight - bottomheight, poleW);

  //roof
  drawBox(x, y - shopHeight + topheight, shopWidth, topheight, shopLength);
  return shelves2;
}
