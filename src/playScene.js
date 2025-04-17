import { upgradeTypes, bakeryItems, itemImages, bgColor, getShopPosition } from "./utilities.js";
import { me, shared, guests } from "./main.js";
import { addTexture, drawShop } from "./game_scene/shop.js";

let textureImage;
let speckleTextureImage;

export function preload() {
  console.log("hi from playScene preload");
  // shopImages = {
  //   // cookie: loadImage("../assets/bakery/items/cookie.png"),
  // };

  for (const item of bakeryItems) {
    itemImages[item] = loadImage(`../assets/bakery/items/${item}.png`);
  }

  textureImage = loadImage("../assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("../assets/textures/cardboard-texture.jpg");
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

  drawShops(guests);

  addTexture(speckleTextureImage, textureImage);
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

    const { x, y } = getShopPosition(i);

    drawShop(x, y, shopType, 0, [], { bread: 3, cookie: 2, croissant: 1 });
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
