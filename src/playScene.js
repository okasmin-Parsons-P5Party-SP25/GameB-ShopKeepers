import { canvasDims, upgradeTypes } from "./utilities.js";
// import {me} from "./main.js";

let shopImages;
const groundHeight = 40;
const topOfGroundY = canvasDims.height - groundHeight;

export function preload() {
  shopImages = {
    plant: loadImage("../assets/plant_2.png"),
    bakery: loadImage("../assets/bakery/bakery_2.png"),
    books: loadImage("../assets/books_2.png"),
  };
}

export function enter() {
  // console.log(me);
  // updateUI();
}

export function update() {
  // updateUI();
}

export function draw() {
  background("#eceadb");

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
    const shopImage = shopImages[shopType];
    image(shopImage, 50 + 400 * i, topOfGroundY - 350, 400, 400);
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
