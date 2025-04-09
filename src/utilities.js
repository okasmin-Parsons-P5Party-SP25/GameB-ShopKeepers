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
