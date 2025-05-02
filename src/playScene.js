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
  plantUpgradeImages,
  clearDudes,
  getInventoryStrings,
  closeAllPopups,
  checkDudesDone,
  myDudeStates,
  updateUI,
} from "./utilities.js";
import { me, guests, changeScene, scenes } from "./main.js";
import { addTexture, drawShop } from "./game_scene/shop.js";
import { preloadDudes, setUpDudes, drawDudes } from "./game_scene/dudes.js";
import { drawBigCreature } from "./game_scene/bigCreature.js";

let textureImage;
let speckleTextureImage;
const logoImage = document.getElementById("logo");

const upgradeMarketButton = document.getElementById("upgrade-market-button");
const littleDudesButton = document.getElementById("test-dude-button");

export function preload() {
  for (const upgradeType of upgradeTypes) {
    for (const imgName of Object.keys(plantUpgradeImages[upgradeType])) {
      plantUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/plant/upgrades/${upgradeType}/${imgName}.png`
      );
    }
    for (const imgName of Object.keys(bakeryUpgradeImages[upgradeType])) {
      bakeryUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/bakery/upgrades/${upgradeType}/${imgName}.png`
      );
    }
  }

  for (const item of bakeryItems) {
    itemImages[item] = loadImage(`./assets/bakery/items/${item}.png`);
  }
  for (const item of plantItems) {
    itemImages[item] = loadImage(`./assets/plant/items/${item}.png`);
  }
  for (const item of bookItems) {
    itemImages[item] = loadImage(`./assets/books/items/${item}.png`);
  }
  preloadDudes();

  textureImage = loadImage("./assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("./assets/textures/cardboard-texture.jpg");
}

export function enter() {
  logoImage.style.display = "block";

  me.dudesState = myDudeStates.none;
  closeAllPopups();
  upgradeMarketButton.style.display = "block";
  littleDudesButton.style.display = "block";
  updateUI(me);

  littleDudesButton.addEventListener("click", startDudes);
}

export function update() {
  updateUI(me);

  if (me.dudesState === myDudeStates.started) {
    if (checkDudesDone(me)) {
      me.dudesState = myDudeStates.finished;
      clearDudes(me);
    }
  }
}

export function leave() {
  me.dudesState = myDudeStates.none;
  upgradeMarketButton.style.display = "none";
  littleDudesButton.style.display = "none";
  closeAllPopups();
}

export function draw() {
  background(bgColor);

  drawShops(guests);
  drawDudes(me);

  addTexture(speckleTextureImage, textureImage);

  if (me.dudesState === myDudeStates.finished) {
    drawBigCreature();
  }
}

const startDudes = () => {
  //set me dudes state to started
  me.dudesState = myDudeStates.started;

  //get my index in guests list
  let myidx = undefined;

  for (let i = 0; i < guests.length; i++) {
    if (guests[i] === me) {
      myidx = i;
      break;
    }
  }

  if (myidx === undefined) return;

  //get my shop position
  const { x, y } = getShopPosition(myidx);

  // make sure I don't have any dudes from last time
  clearDudes(me);

  // setup new dudes
  setUpDudes(me, x + purchaseDetectionRadius, y - purchaseDetectionRadius);
};

export function mousePressed() {
  if (me.dudesState === myDudeStates.finished) {
    me.dudesState = myDudeStates.none;
    changeScene(scenes.quiz);
  }
}

export const drawShops = (guests) => {
  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;

    const inventory = getInventoryStrings(guest);

    const shopType = guest.shopType;
    const upgrades = guest.upgrades;
    const level = guest.upgradeLevel;

    const { x, y } = getShopPosition(i);

    drawShop(x, y, shopType, level, upgrades, inventory);
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
};
