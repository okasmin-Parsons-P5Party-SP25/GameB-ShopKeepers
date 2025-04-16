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


// drawing shop stuff

export const angle = 40
export const draw_placement_dot = false
export const modes = {
    BOTTOM_MIDDLE:1,
    BOTTOM_CORNER:2,
    CENTER:3,
    TOP_CORNER:4,
    BACK_CORNER:5,
}
export const faceType = {
    FRONT:1,
    SIDE:2,
    TOP:3,
    BOTTOM_INNER:4,
    SIDE_INNER:5,
    BACK_INNER:6,
    BACK_LIGHT:7
}

export const wallColors = {
    front:"#F2EBDC",
    side:"#ECE1CF",
    top:"#F5F1E7",
    inside:"#FAF1E1"
}

export const shelfColor = {
    back:"#E8D7BB",
    side:"#F1E2CA",
    bottom:"#ECE1CF",
    bottom_light:"#ECE1CF"
}

export let item_images = {}; 
export const bgColor = "#FBF9F4";
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
