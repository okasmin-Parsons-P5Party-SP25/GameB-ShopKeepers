import { canvasDims, shopTypes, upgradeTypes, bgColor, item_images } from "./utilities.js";
import { drawShop, addTexture } from "./game_scene/shop.js";
import { me, shared, guests } from "./main.js";

let shopImages;
const groundHeight = 300;
const topOfGroundY = canvasDims.height - groundHeight;

// drawing images
let textureImg, speckle_texture;
//all the images for all the items

export function preload() {
  shopImages = {
    plant: loadImage("../assets/plant_2.png"),
    bakery: loadImage("../assets/bakery_2.png"),
    books: loadImage("../assets/books_2.png"),
  };
  textureImg = loadImage("../assets/textures/white-paper-texture.jpg");
  speckle_texture = loadImage("../assets/textures/cardboard-texture.jpg");
  item_images["cookie"] = loadImage("../assets/bakery/items/cookie.png");
  item_images["cake"] = loadImage("../assets/bakery/items/cake.png");
  item_images["bread"] = loadImage("../assets/bakery/items/bread1.png");
  item_images["croissant"] = loadImage("../assets/bakery/items/croissant.png");
  item_images["pie"] = loadImage("../assets/bakery/items/pie.png");
  item_images["loaf"] = loadImage("../assets/bakery/items/loaf.png");
  console.log("preloaded");
}

export function enter() {
  // console.log(me);
  // updateUI();
}

export function update() {
  // updateUI();
}

export function draw() {
  background(bgColor);

  drawShops();
  addTexture(speckle_texture, textureImg);
  // drawShops();
}

export function mousePressed() {
  //   changeScene(scenes.title);
}

export const drawShops = (guests) => {
  drawShop(
    50 + 400,
    groundHeight,
    "bakery",
    2,
    {},
    {
      bread: 3,
      cookie: 2,
      croissant: 1,
      pie: 1,
    }
  );
  console.log("GUESTS", guests);
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const shopType = guest.shopType;
    // console.log(guest.inventory)
    drawShop(
      50 + 400 * i,
      groundHeight,
      shopType,
      2,
      {},
      {
        bread: 3,
        cookie: 2,
        croissant: 1,
        pie: 1,
      }
    );
    // drawShop(window.innerWidth/2, groundHeight, shopType, 1, guest.upgrades, guest.inventory);
    // const shopImage = shopImages[shopType];
    // image(shopImage, 50 + 400 * i, topOfGroundY - 350, 400, 400);
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
