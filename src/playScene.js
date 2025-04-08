import { canvasDims } from "./utilities.js";

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
    shopType: undefined,
    inventory: [],
    upgradeLevel: 0,
  });

  guests = partyLoadGuestShareds();

  shopImages = {
    plant: loadImage("../assets/plant_2.png"),
    bakery: loadImage("../assets/bakery_2.png"),
    books: loadImage("../assets/books_2.png"),
  };
}

export function enter() {
  console.log("guests", guests);
  console.log("me", me);
}

export function update() {}

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
