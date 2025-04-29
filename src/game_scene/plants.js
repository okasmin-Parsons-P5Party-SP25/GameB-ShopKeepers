import { modes, angle, shelfColor, plantUpgradeImages } from "../utilities.js";
import { drawInventory, drawShelves, drawBox } from "./shapes.js";
const topheight = 25;
const bottomheight = 60;

export function drawPlantShop(x, y, level, upgrades, inventory) {
  let shopWidth, shopHeight, shopLength;
  let textShift = 0;
  if (upgrades.length === 0) {
    [shopWidth, shopHeight, shopLength] = [150, 180, 40];
  } else if (upgrades.length === 1) {
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

  //draw upgrades
  let upgradeH;
  const upgradeW = shopWidth * 2.5;
  let upgradex, upgradey;
  if (upgrades.includes("decor")) {
    for (const [name, img] of Object.entries(plantUpgradeImages.decor)) {
      upgradeH = (upgradeW * img.height) / img.width;
      upgradex = x - shopWidth / 2 - 20;
      upgradey = y - upgradeH + 20;
      image(img, upgradex, upgradey, upgradeW, upgradeH);
    }
  }
  // console.log(upgradeH, upgradeW, upgradex, upgradey);
  if (upgrades.includes("light")) {
    let img = plantUpgradeImages.light.lightnormal;
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
