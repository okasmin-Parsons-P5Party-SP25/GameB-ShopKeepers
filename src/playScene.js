import { canvasDims, shopTypes, upgradeTypes,bgColor ,item_images} from "./utilities.js";
import { drawShop, addTexture } from "./game_scene/shop.js";
export let shared;
export let guests;
export let me;

let shopImages;
const groundHeight = 300;
const topOfGroundY = canvasDims.height - groundHeight;

// drawing images
let textureImg, speckle_texture;
//all the images for all the items

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
  textureImg = loadImage('../assets/textures/white-paper-texture.jpg')
  speckle_texture = loadImage('../assets/textures/cardboard-texture.jpg')
  item_images['cookie'] = loadImage('../assets/bakery/items/cookie.png')
  item_images['cake'] = loadImage('../assets/bakery/items/cake.png')
  item_images['bread'] = loadImage('../assets/bakery/items/bread1.png')
  item_images['croissant'] = loadImage('../assets/bakery/items/croissant.png')
  item_images['pie'] = loadImage('../assets/bakery/items/pie.png')
  item_images['loaf'] = loadImage('../assets/bakery/items/loaf.png')
}

export function enter() {
  updateUI();
}

export function update() {
  updateUI();
}

export function draw() {
  background(bgColor);

  drawShops();
  addTexture(speckle_texture, textureImg);
}

export function mousePressed() {
  //   changeScene(scenes.title);
}

const drawShops = () => {
  // console.log("DRAWING SHOP")
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    const shopType = guest.shopType;
    // console.log(guest.inventory)
      drawShop(50 + 400 * i, groundHeight, shopType, 2, guest.upgrades, {'bread':3,'cookie':2,'croissant':1,'pie':1});
    // drawShop(window.innerWidth/2, groundHeight, shopType, 1, guest.upgrades, guest.inventory);
    // const shopImage = shopImages[shopType];
    // image(shopImage, 50 + 400 * i, topOfGroundY - 350, 400, 400);
  }
};

const updateUI = () => {
  const myInventoryDiv = document.getElementById("my-inventory");
  myInventoryDiv.textContent = `my inventory:${me.inventory}`;

  const myMoneyDiv = document.getElementById("my-money");
  myMoneyDiv.textContent = `my money:${me.money}`;
};
