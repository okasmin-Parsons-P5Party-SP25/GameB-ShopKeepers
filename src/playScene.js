import { canvasDims, upgradeTypes, bakeryItems, itemImages, bgColor } from "./utilities.js";
import { me, shared } from "./main.js";
import {
  drawShop,
  // addTexture
} from "./game_scene/shop.js";

const groundHeight = 40;
const topOfGroundY = canvasDims.height - groundHeight;

export function preload() {
  console.log("hi from playScene preload");
  // shopImages = {
  //   // cookie: loadImage("../assets/bakery/items/cookie.png"),
  // };

  for (const item of bakeryItems) {
    itemImages[item] = loadImage(`../assets/bakery/items/${item}.png`);
  }
}

export function enter() {
  console.log("me from playScene", me);
  console.log("shared form playScene", shared);
  // updateUI();
}

export function update() {
  // updateUI();
}

export function draw() {
  background(bgColor);

  // drawShops();
}

export function mousePressed() {
  //   changeScene(scenes.title);
}

export const drawShops = (guests) => {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const shopType = guest.shopType;
    // const shopImage = shopImages[shopType];
    // const shopImage = itemImages.bread;
    // image(shopImage, 50 + 400 * i, topOfGroundY - 350, 400, 400);

    drawShop(i * 300, topOfGroundY, shopType, 0, [], { bread: 3, cookie: 2, croissant: 1 });
  }
};

export const updateUI = (me) => {
  const myInventoryDiv = document.getElementById("my-upgrades");
  myInventoryDiv.textContent = `
  my upgrade level: ${me.upgradeLevel} | 
  ${upgradeTypes[0]}: ${me.upgrades[0]} |
   ${upgradeTypes[1]}: ${me.upgrades[1]} |
    ${upgradeTypes[2]}: ${me.upgrades[2]}
  `;

  const myMoneyDiv = document.getElementById("my-money");
  myMoneyDiv.textContent = `my coins:${me.coins}`;
};
