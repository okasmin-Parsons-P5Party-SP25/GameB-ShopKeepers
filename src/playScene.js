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
  plantUpgradeImages,
  clearDudes,
  getInventoryStrings,
  dudesBuyAllInventory,
  closeAllPopups,
} from "./utilities.js";
import { me, shared, guests } from "./main.js";
import { addTexture, drawShop } from "./game_scene/shop.js";
import { preloadDudes, setUpDudes, drawDudes } from "./game_scene/dudes.js";

let textureImage;
let speckleTextureImage;

const upgradeMarketButton = document.getElementById("upgrade-market-button");

export function preload() {
  // console.log("hi from playScene preload");
  for (const upgradeType of upgradeTypes) {
    for (const imgName of Object.keys(plantUpgradeImages[upgradeType])) {
      plantUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/plant/upgrades/${upgradeType}/${imgName}.png`
      );
    }
    for (const imgName of Object.keys(bakeryUpgradeImages[upgradeType])) {
      bakeryUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/bakery/upgrades/${upgradeType}/${imgName}.png`
      );
    }
  }

  for (const item of bakeryItems) {
    itemImages[item] = loadImage(`./assets/bakery/items/${item}.png`);
  }
  for (const item of plantItems) {
    itemImages[item] = loadImage(`./assets/plant/items/${item}.png`);
  }
  for (const item of bookItems) {
    itemImages[item] = loadImage(`./assets/books/items/${item}.png`);
  }
  preloadDudes();

  textureImage = loadImage("./assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("./assets/textures/cardboard-texture.jpg");
}

export function enter() {
  closeAllPopups();
  upgradeMarketButton.style.display = "block";
  console.log("me from playScene", me);
  console.log("shared form playScene", shared);
  updateUI(me);

  const testDudeButton = document.getElementById("test-dude-button");
  testDudeButton.addEventListener("click", handleDudes);
}

export function update() {
  updateUI(me);
}

export function leave() {
  upgradeMarketButton.style.display = "none";
}

export function draw() {
  background(bgColor);

  drawShops(guests);

  addTexture(speckleTextureImage, textureImage);
}

const handleDudes = () => {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const { x, y } = getShopPosition(i);
    console.log({ x, y });
    clearDudes(guest);
    setUpDudes(guest, x + purchaseDetectionRadius, y - purchaseDetectionRadius);
    console.log(guest.dudes.length);
    // TODO this is arbitrarily set to 5 seconds
    setTimeout(() => {
      dudesBuyAllInventory(guest);
    }, 5000);
  }
};

export function mousePressed() {}

export const drawShops = (guests) => {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;

    const inventory = getInventoryStrings(guest);

    const shopType = guest.shopType;

    const { x, y } = getShopPosition(i);

    drawShop(x, y, shopType, 0, ["decor", "light"], inventory);
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
    // console.log("drawing dudes", guest.dudes.length);
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
