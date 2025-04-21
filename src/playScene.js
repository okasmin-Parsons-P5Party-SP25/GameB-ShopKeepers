import {
  upgradeTypes,
  bakeryItems,
  plantItems,
  bookItems,
  itemImages,
  bgColor,
  getShopPosition,
  getInventoryCost,
  inventoryTypes,
  drawPlacementDot,
  purchaseDetectionRadius,
  bakeryUpgradeImages,
} from "./utilities.js";
import { me, shared, guests } from "./main.js";
import { addTexture, drawShop } from "./game_scene/shop.js";
import { preloadDudes, setUpDudes, drawDudes } from "./game_scene/dudes.js";

let textureImage;
let speckleTextureImage;

export function preload() {
  console.log("hi from playScene preload");
  // shopImages = {
  //   cookie: loadImage("../assets/bakery/items/cookie.png"),
  // };
  for (const upgradeType of upgradeTypes) {
    for (const imgName of Object.keys(bakeryUpgradeImages[upgradeType])) {
      bakeryUpgradeImages[upgradeType][imgName] = loadImage(
        `../assets/bakery/upgrades/${upgradeType}/${imgName}.PNG`
      );
    }
  }

  for (const item of bakeryItems) {
    itemImages[item] = loadImage(`../assets/bakery/items/${item}.PNG`);
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
}

export function update() {
  updateUI(me);
}

export function draw() {
  background(bgColor);

  drawShops(guests);

  addTexture(speckleTextureImage, textureImage);
}

export function mousePressed() {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const { x, y } = getShopPosition(i);
    clearDudes(guest);
    setUpDudes(guest, i, x + purchaseDetectionRadius, y - purchaseDetectionRadius, 3);
  }
}

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

export const dudeBuyInventory = (guestIdx) => {
  const guest = guests[guestIdx];
  if (!guest.shopType || !guest.inventory) return;

  // choose a nonzero item
  // for now this goes through the inventory items in order
  let itemIdx = false;
  for (let i = 0; i < guest.inventory.length; i++) {
    if (guest.inventory[i]) {
      itemIdx = i;
      break;
    }
  }
  if (itemIdx === false) return;

  // decrement inventory for that item
  guest.inventory[itemIdx] -= 1;

  // add money to guest for that item
  const itemCost = getInventoryCost(itemIdx, guest);
  guest.coins += itemCost.sell;

  // return inventory string: ex: "bread"
  const itemString = inventoryTypes[guest.shopType][itemIdx];

  return itemString;
};

// call after dudes finished
export const clearDudes = (guest) => {
  guest.dudes = [];
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
