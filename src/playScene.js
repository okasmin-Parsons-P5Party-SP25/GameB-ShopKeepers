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
  bookUpgradeImages,
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

let textureImage;
let speckleTextureImage;
let coinImg;

const logoImage = document.getElementById("logo");
let coinImg;

const upgradeMarketButton = document.getElementById("upgrade-market-button");
const littleDudesButton = document.getElementById("test-dude-button");
const quizButton = document.getElementById("quiz-button");
const bigCreatureQuizPrompt = document.getElementById("big-creature-quiz");

export function preload() {
  for (const upgradeType of upgradeTypes) {
    for (const imgName of Object.keys(plantUpgradeImages[upgradeType])) {
      plantUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/plant/upgrades/${upgradeType}/${imgName}.png`
      );
    }
    for (const imgName of Object.keys(bookUpgradeImages[upgradeType])) {
      bookUpgradeImages[upgradeType][imgName] = loadImage(
        `./assets/books/upgrades/${upgradeType}/${imgName}.png`
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
  logoImage.style.display = "flex";

  me.dudesState = myDudeStates.none;
  clearDudes(me);
  closeAllPopups();
  upgradeMarketButton.style.display = "block";
  littleDudesButton.style.display = "block";
  quizButton.style.display = "block";
  updateUI(me);

  littleDudesButton.addEventListener("click", () => {
    startDudes();
    closeAllPopups();
  });
}

export function update() {
  updateUI(me);

  if (me.dudesState === myDudeStates.finished) {
    bigCreatureQuizPrompt.style.display = "flex";
    closeAllPopups();
  }

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
  quizButton.style.display = "none";
  bigCreatureQuizPrompt.display = "none";
  closeAllPopups();
}

export function draw() {
  background(bgColor);

  drawShops(guests);
  drawDudes(me);

  addTexture(speckleTextureImage, textureImage);

  if (coinImg) {
    image(coinImg); // adjust position and size as needed
  }
  if (coinImg) {
    image(coinImg); // adjust position and size as needed
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
    bigCreatureQuizPrompt.style.display = "none";
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

  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i];
    if (!guest.shopType) continue;
    // console.log("drawing dudes", guest.dudes.length);
    drawDudes(guest);
  }
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

  const myMoneyGodModeDiv = document.getElementById("my-money-godMode");
  if (myMoneyGodModeDiv) {
    myMoneyGodModeDiv.textContent = `${me.coins} 🪙`;
  }

  const myMoneyDiv = document.getElementById("my-money");
  if (myMoneyDiv) {
    myMoneyDiv.textContent = `${me.coins} 🪙`;
  }
};
