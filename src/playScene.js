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
} from "./utilities.js";
import { me, shared, guests } from "./main.js";
import { addTexture, drawShop } from "./game_scene/shop.js";
import { preloadDudes, setUpDudes, drawDudes } from "./game_scene/dudes.js";

let textureImage;
let speckleTextureImage;

export function preload() {
  console.log("hi from playScene preload");
  for (const upgradeType of upgradeTypes) {
    for (const imgName of Object.keys(bakeryUpgradeImages[upgradeType])) {
      bakeryUpgradeImages[upgradeType][imgName] = loadImage(
        `../assets/bakery/upgrades/${upgradeType}/${imgName}.PNG`
      );
    }
  }

  for (const item of bakeryItems) {
    let png = "png";
    if (item === "bwcookie") {
      png = "PNG";
    }
    itemImages[item] = loadImage(`../assets/bakery/items/${item}.${png}`);
  }
  for (const item of plantItems) {
    itemImages[item] = loadImage(`../assets/plant/items/${item}.PNG`);
  }
  for (const item of bookItems) {
    itemImages[item] = loadImage(`../assets/books/items/${item}.PNG`);
  }
  preloadDudes();

  textureImage = loadImage("../assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("../assets/textures/cardboard-texture.jpg");
}

export function enter() {
  console.log("me from playScene", me);
  console.log("shared form playScene", shared);
  updateUI(me);

  const testDudeButton = document.getElementById("test-dude-button");
  testDudeButton.addEventListener("click", handleDudes);
}

export function update() {
  updateUI(me);
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
    setUpDudes(guest, i, x + purchaseDetectionRadius, y - purchaseDetectionRadius, 3);
  }
};

export function mousePressed() {}

export const drawShops = (guests) => {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const shopType = guest.shopType;

    const { x, y } = getShopPosition(i);

    drawShop(x, y, shopType, 0, ["decor"], { bread: 3, cookie: 2, croissant: 1 });
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

  const myMoneyDiv = document.getElementById("my-money");
  myMoneyDiv.textContent = `my coins:${me.coins}`;
};
