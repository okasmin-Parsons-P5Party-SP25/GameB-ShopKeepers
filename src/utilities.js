export const godMode = true;

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
  baguette: "baguette",
  croissant: "croissant",
  pie: "pie",
  cookie: "cookie",
  loaf: "loaf",
  chocoCroissant: "chocolate_croissant",
};

export const bakeryItems = Object.values(bakeryInventoryTypes);

// index of item refers to its level
export const inventoryTypes = {
  plant: plantInventoryTypes,
  bakery: [bakeryInventoryTypes.bread, bakeryInventoryTypes.croissant, bakeryInventoryTypes.cookie],
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

const groundHeight = 100;
const topOfGroundY = canvasDims.height - groundHeight;
export const purchaseDetectionRadius = 100;
// get x and y position of shop based on guest idx
export const getShopPosition = (idx) => {
  return {
    x: 100 + idx * 300,
    y: topOfGroundY,
  };
};

export const triggerDudes = () => {};
