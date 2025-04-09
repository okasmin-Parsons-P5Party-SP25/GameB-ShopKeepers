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
  pie: "pie"
};

export const inventoryTypes = {
  plant: plantInventoryTypes,
  bakery: bakeryInventoryTypes,
  books: bookInventoryTypes
};

// constant across each shop type?
export const upgradeTypes = {
  light: "light",
  awning: "awning",
  secondFloor: "second floor",
};

export const upgradeOptions = {
  plant: [],
  bakery: [{type: upgradeTypes.light, cost: 10}, {type: upgradeTypes.awning, cost: 20}],
  books: [],
};


// select popup UI elements
// const chooseTypeDiv = document.getElementById("choose-type");
// const quizDiv = document.getElementById("quiz");
// const upgradeMarketDiv = document.getElementById("upgrade-market");

// function to hide all popups
// export const closeAllPopups = () => {
//   chooseTypeDiv.classList.add("hidden");
//   quizDiv.classList.add("hidden");
//   upgradeMarketDiv.classList.add("hidden");
// };
