import { canvasDims, shopTypes, upgradeTypes } from "./utilities.js";

export let shared;
export let guests;
export let me;

let shopImages;
const groundHeight = 40;
const topOfGroundY = canvasDims.height - groundHeight;

export function preload() {
  partyConnect("wss://demoserver.p5party.org", "shop_keepers");
  shared = partyLoadShared("shared", {});

  me = partyLoadMyShared({
    shopType: undefined, // one of shopTypes,
    inventory: [], // list of inventoryTypes (increment from questions, decrement when bought)
    money: 0, // number (increment from sell inventory, decrement when buy upgrades)
    upgrades: [], // list of upgradeTypes
  });



  // example me object with data
    const me_example = partyLoadMyShared({
    shopType: shopTypes.bakery,
    inventory: [{bread: 10}], //this will be saved as inventoryTypes.bakery.bread
    money: 20,
    upgrades: [upgradeTypes.light, upgradeTypes.awning],
  });



  guests = partyLoadGuestShareds();

  shopImages = {
    plant: loadImage("../assets/plant_2.png"),
    bakery: loadImage("../assets/bakery_2.png"),
    books: loadImage("../assets/books_2.png"),
  };
}

export function enter() {
  updateUI();
}

export function update() {
  updateUI();
}

export function draw() {
  background("#eceadb");

  drawShops();
}

export function mousePressed() {
  //   changeScene(scenes.title);
}

const drawShops = () => {
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
  myInventoryDiv.textContent = `my inventory:${me.inventory}`;

  const myMoneyDiv = document.getElementById("my-money");
  myMoneyDiv.textContent = `my money:${me.money}`;
};
