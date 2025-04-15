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
  height: 600,
};

export const shopTypes = {
  plant: "plant",
  bakery: "bakery",
  books: "books",
};

const plantInventoryTypes = {};
const bookInventoryTypes = {};
const bakeryInventoryTypes = {
  bread: "bread",
  croissant: "croissant",
  pie: "pie",
};

// index of item refers to its level
export const inventoryTypes = {
  plant: plantInventoryTypes,
  bakery: [bakeryInventoryTypes.bread, bakeryInventoryTypes.croissant, bakeryInventoryTypes.pie],
  books: bookInventoryTypes,
};

// inventory items are sold for more as upgrade shop
const sellMultiplier = [1, 2, 4, 6];

export const getInventoryCost = (idx, me) => {
  let buy;
  let sell;
  const level = me.upgradeLevel;

  if (idx === 0) {
    buy = 1;
    sell = 10;
  } else if (idx === 1) {
    buy = 5;
    sell = 30;
  } else if (idx === 2) {
    buy = 10;
    sell = 50;
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
  sound: "sound",
};

// index of item refers to its level
export const upgradeTypes = [upgradeChoices.light, upgradeChoices.decor, upgradeChoices.sound];

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
