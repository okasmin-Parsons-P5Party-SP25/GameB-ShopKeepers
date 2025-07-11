// export const godMode = false;
import { updateAmountText } from "./upgradeMarket.js";

/// forward event handlers to the current scene, if they handle them
export const p5Events = [
  // keyboard
  "keyPressed",
  "keyReleased",
  "keyTyped",

  // mouse
  "doubleClicked",
  "mouseDragged",
  "mouseReleased",
  "mouseWheel",
  "mouseMoved",
  "mouseClicked",
  "mousePressed",

  // touch
  "touchMoved",
  "touchStarted",
  "touchEnded",
];

export const canvasDims = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const shopTypes = {
  plant: "plant",
  bakery: "bakery",
  books: "books",
};

const plantInventoryTypes = {
  plant1: "plant1",
  plant2: "plant2",
  plant3: "plant3",
};
const bookInventoryTypes = {
  textbook: "book1",
  book: "book2",
  card: "card",
};

const bakeryInventoryTypes = {
  bread: "bread",
  baguette: "baguette",
  croissant: "croissant",
  bwcookie: "bwcookie",
  cookie: "cookie",
};

// all values are used for image loading
export const bakeryItems = Object.values(bakeryInventoryTypes);
export const bookItems = Object.values(bookInventoryTypes);
export const plantItems = Object.values(plantInventoryTypes);

// max 3 inventory item types per shop
// index of item refers to its level (this determine cost)
// and stores specific inventory type for that store
export const inventoryTypes = {
  plant: [...plantItems],
  bakery: [bakeryInventoryTypes.bread, bakeryInventoryTypes.croissant, bakeryInventoryTypes.cookie],
  books: [...bookItems],
};

// inventory items are sold for more as upgrade shop
const sellMultiplier = [1, 1.5, 2, 2.5];

export const getInventoryCost = (idx, me) => {
  let buy;
  let sell;
  const level = me.upgradeLevel;

  if (idx === 0) {
    buy = 5;
    sell = 10;
  } else if (idx === 1) {
    buy = 30;
    sell = 80;
  } else if (idx === 2) {
    buy = 100;
    sell = 250;
  }
  return {
    buy,
    sell: sell * sellMultiplier[level],
  };
};

// constant across each shop type
export const upgradeChoices = {
  light: "light",
  decor: "decor",
  pet: "pet",
};

// index of item refers to its level
export const upgradeTypes = [upgradeChoices.decor, upgradeChoices.light, upgradeChoices.pet];
export const bakeryUpgradeImages = {
  decor: { barrels: "", menu: "", sideshelf: "", roof: "" },
  light: { sign: "", signLight: "" },
  pet: { cat1: "", cat2: "", cat3: "" },
};

export const plantUpgradeImages = {
  decor: { backwall: "", decor: "", roof: "" },
  light: { lightadd: "", lightnormal: "", lightshadow: "" },
  pet: { bee1: "", bee2: "" },
};

export const bookUpgradeImages = {
  decor: { outdoor: "", door: "", roof: "", sidetree: "", window: "" },
  light: { lightadd: "", lightnormal: "" },
  pet: { bird1: "", bird2: "", bird3: "" },
};

export const getUpgradeCost = (idx) => {
  if (idx === 0) return { buy: 300 };
  else if (idx === 1) return { buy: 600 };
  else if (idx === 2) return { buy: 1000 };
};

export const closeAllPopups = () => {
  document.querySelectorAll(".popupItem").forEach((item) => {
    item.classList.add("hidden");
  });
};

// drawing shop stuff

export const angle = 40;
export const drawPlacementDot = false;
export const modes = {
  BOTTOM_MIDDLE: 1,
  BOTTOM_CORNER: 2,
  CENTER: 3,
  TOP_CORNER: 4,
  BACK_CORNER: 5,
};
export const faceType = {
  FRONT: 1,
  SIDE: 2,
  TOP: 3,
  BOTTOM_INNER: 4,
  SIDE_INNER: 5,
  BACK_INNER: 6,
  BACK_LIGHT: 7,
};

export const wallColors = {
  front: "#F2EBDC",
  side: "#ECE1CF",
  top: "#F5F1E7",
  inside: "#FAF1E1",
};

export const shelfColor = {
  back: "#E8D7BB",
  side: "#F1E2CA",
  bottom: "#ECE1CF",
  bottomLight: "#ECE1CF",
};

export const itemImages = {};
export const dudeImages = [];
export const bgColor = "#FBF9F4";

const groundHeight = 250;
const topOfGroundY = canvasDims.height - groundHeight;
export const purchaseDetectionRadius = 100;
// get x and y position of shop based on guest idx
export const getShopPosition = (idx) => {
  return {
    x: 100 + idx * 300,
    y: topOfGroundY,
  };
};

const maxNumDudes = 10;

export const dudeGetAllInventory = (guest) => {
  if (!guest.shopType || !guest.inventory) return;

  const itemStrings = guest.inventory.flatMap((num, idx) =>
    Array(num).fill({ itemString: inventoryTypes[guest.shopType][idx], itemIdx: idx })
  );

  if (itemStrings.length > maxNumDudes) {
    return itemStrings.slice(0, maxNumDudes);
  }

  return itemStrings;
};

export const dudeBuySingleItem = (guest, itemIdx) => {
  if (!guest.shopType || !guest.inventory) return;

  // decrement inventory for that item
  guest.inventory[itemIdx] -= 1;

  // add money to guest for that item
  const itemCost = getInventoryCost(itemIdx, guest);
  guest.coins += itemCost.sell;

  // update text in upgrade market
  updateAmountText(guest, itemIdx);
};

// call after dudes finished
export const clearDudes = (guest) => {
  guest.dudes = [];
};

export const triggerDudes = () => {};

// for shop drawing inventory
export const getInventoryStrings = (guest) => {
  if (!guest.shopType) return;
  const { shopType, inventory } = guest;

  const inventoryObj = {};

  for (let i = 0; i < inventory.length; i++) {
    const itemString = inventoryTypes[shopType][i];
    inventoryObj[itemString] = inventory[i];
  }
  return inventoryObj;
};

// check if every dude is dead
export const checkDudesDone = (me) => {
  // dudes haven't started or already finished
  if (me.dudesState !== myDudeStates.started) return false;

  for (const dude of me.dudes) {
    if (dude.alive) return false;
  }
  return true;
};

/**
 * none when enter scene, etc
 * started for when dudes button is clicked
 * finished for when dudes are finished
 * when leave scene, sets back to none
 */
export const myDudeStates = {
  none: "none",
  started: "started",
  finished: "finished",
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

  const coinHTML = `<span>${me.coins} <img src="./assets/coin.png" style="width: 25px; height: 25px; vertical-align: middle;" /></span>`;

  const myMoneyGodModeDiv = document.getElementById("my-money-godMode");
  if (myMoneyGodModeDiv) {
    myMoneyGodModeDiv.innerHTML = coinHTML;
  }

  const myMoneyDiv = document.getElementById("my-money");
  if (myMoneyDiv) {
    myMoneyDiv.innerHTML = coinHTML;
  }
};
