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
