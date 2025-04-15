import { canvasDims,  } from "./utilities.js";

let shopImages;
const groundHeight = 40;
const topOfGroundY = canvasDims.height - groundHeight;

export function preload() {
  shopImages = {
    plant: loadImage("../assets/plant_2.png"),
    bakery: loadImage("../assets/bakery_2.png"),
    books: loadImage("../assets/books_2.png"),
  };
}

export function enter() {
  // console.log(guests);
  updateUI();
}

export function update() {
  updateUI();
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

const updateUI = () => {
  const myInventoryDiv = document.getElementById("my-inventory");
  myInventoryDiv.textContent = `my inventory:${"placeholder"}`;

  const myMoneyDiv = document.getElementById("my-money");
  myMoneyDiv.textContent = `my money:${"placeholder"}`;
};
