import {
  upgradeTypes,
  bakeryItems,
  plantItems,
  bookItems,
  itemImages,
  bgColor,
  getShopPosition,
  drawPlacementDot,
  purchaseDetectionRadius,
  bakeryUpgradeImages,
  clearDudes,
  getInventoryStrings,
  closeAllPopups,
  checkDudesDone,
} from "./utilities.js";
import { me, shared, guests, changeScene, scenes } from "./main.js";
import { addTexture, drawShop } from "./game_scene/shop.js";
import { preloadDudes, setUpDudes, drawDudes } from "./game_scene/dudes.js";
import { drawBigCreature } from "./game_scene/bigCreature.js";

let textureImage;
let speckleTextureImage;

const upgradeMarketButton = document.getElementById("upgrade-market-button");
const littleDudesButton = document.getElementById("test-dude-button");

export function preload() {
  // console.log("hi from playScene preload");
  for (const upgradeType of upgradeTypes) {
    for (const imgName of Object.keys(bakeryUpgradeImages[upgradeType])) {
      bakeryUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/bakery/upgrades/${upgradeType}/${imgName}.PNG`
      );
    }
  }

  for (const item of bakeryItems) {
    let png = "png";
    if (item === "bwcookie") {
      png = "PNG";
    }
    itemImages[item] = loadImage(`./assets/bakery/items/${item}.${png}`);
  }
  for (const item of plantItems) {
    itemImages[item] = loadImage(`./assets/plant/items/${item}.PNG`);
  }
  for (const item of bookItems) {
    itemImages[item] = loadImage(`./assets/books/items/${item}.PNG`);
  }
  preloadDudes();

  textureImage = loadImage("./assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("./assets/textures/cardboard-texture.jpg");
}

export function enter() {
  shared.dudesDone = false;

  closeAllPopups();
  upgradeMarketButton.style.display = "block";
  littleDudesButton.style.display = "block";
  // console.log("me from playScene", me);
  // console.log("shared form playScene", shared);
  updateUI(me);

  const testDudeButton = document.getElementById("test-dude-button");
  testDudeButton.addEventListener("click", handleDudes);
}

export function update() {
  updateUI(me);
  if (frameCount % 20 === 0 && !shared.dudesDone) {
    shared.dudesDone = checkDudesDone(guests);
    if (shared.dudesDone === true) {
      for (const guest of guests) {
        clearDudes(guest);
      }
    }
  }
}

export function leave() {
  upgradeMarketButton.style.display = "none";
  littleDudesButton.style.display = "none";
  closeAllPopups();
}

export function draw() {
  background(bgColor);

  drawShops(guests);

  addTexture(speckleTextureImage, textureImage);

  if (shared.dudesDone === true) {
    drawBigCreature();
  }
}

const handleDudes = () => {
  shared.dudesDone = false;
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const { x, y } = getShopPosition(i);
    clearDudes(guest);
    setUpDudes(guest, x + purchaseDetectionRadius, y - purchaseDetectionRadius);
  }
};

export function mousePressed() {
  if (shared.dudesDone === true) {
    changeScene(scenes.quiz);
    shared.dudesDone = false;
  }
}

export const drawShops = (guests) => {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;

    const inventory = getInventoryStrings(guest);

    const shopType = guest.shopType;
    const upgrades = guest.upgrades;

    const { x, y } = getShopPosition(i);

    drawShop(x, y, shopType, 0, upgrades, inventory);
    if (drawPlacementDot) {
      fill("red");
      ellipse(x, y, 5, 5);
      push();
      ellipseMode(CENTER);
      noFill();
      stroke("red");
      ellipse(
        x + purchaseDetectionRadius,
        y - purchaseDetectionRadius,
        purchaseDetectionRadius * 2,
        purchaseDetectionRadius * 2
      );
      pop();
    }
  }

  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    drawDudes(guest);
  }
};

export const updateUI = (me) => {
  const myInventoryDiv = document.getElementById("my-upgrades");
  myInventoryDiv.textContent = `
  my upgrade level: ${me.upgradeLevel} | 
  ${upgradeTypes[0]}: ${me.upgrades[0]} |
   ${upgradeTypes[1]}: ${me.upgrades[1]} |
    ${upgradeTypes[2]}: ${me.upgrades[2]} |
    my inventory: ${me.inventory}
  `;

  const myMoneyGodModeDiv = document.getElementById("my-money-godMode");
  if (myMoneyGodModeDiv) {
    myMoneyGodModeDiv.textContent = `${me.coins} 🪙`;
  }

  const myMoneyDiv = document.getElementById("my-money");
  if (myMoneyDiv) {
    myMoneyDiv.textContent = `${me.coins} 🪙`;
  }
};
