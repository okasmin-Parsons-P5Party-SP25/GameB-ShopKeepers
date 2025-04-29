import * as playScene from "./playScene.js";
import * as splashScene from "./splashScene.js";
import { setupQuizUI } from "./quiz.js";
import { setupChooseTypeUI } from "./chooseShopType.js";
import { setupUpgradeMarketUI } from "./upgradeMarket.js";
import DOMCursors from "./DOMCursors.js";

import { p5Events, canvasDims, godMode, shopTypes } from "./utilities.js";
export let shared;
export let guests;
export let me;

// all the available scenes
export const scenes = {
  play: playScene,
  splash: splashScene,
};

// URL parameters
const urlParams = new URLSearchParams(window.location.search);
const startScene = urlParams.get("scene");

let currentScene; // the scene being displayed

// Add to URL to show splash by itself instead of play scene
// Example: index.html?scene=splash
// To go to play scene: index.html?scene=play

// If no scene parameter is provided, we'll show the splash first and then transition to play

window.preload = function () {
  partyConnect("wss://demoserver.p5party.org", "shop_keepers_4");

  shared = partyLoadShared("shared", {
    quizCoins: 100,
  });

  me = partyLoadMyShared({
    shopType: undefined, // one of shopTypes,
    inventory: [0, 0, 0], // index refers to inventory level, value is ammount
    coins: 0, // number,
    upgrades: [false, false, false], // index refers to inventory level, true if purchased
    upgradeLevel: 0, // increase to 1, 2, or 3 with each upgrade purchase
    dudes: [],
  });

  guests = partyLoadGuestShareds();
  Object.values(scenes).forEach((scene) => scene.preload?.());
};

window.setup = function () {
  if (godMode === false) {
    me.coins = 1000;
    me.shopType = shopTypes.bakery;
    me.inventory = [5, 5, 5];
  }

  // console.log("window setup");
  createCanvas(canvasDims.width, canvasDims.height);
  noFill();
  noStroke();

  // Initialize the DOMCursors after canvas creation
  new DOMCursors(false);

  Object.values(scenes).forEach((scene) => scene.setup?.());

  // Determine which scene to show first based on URL parameter
  if (startScene === "splash") {
    changeScene(scenes.splash);
  } else if (startScene === "play") {
    changeScene(scenes.play);
  } else {
    // If no parameter, default to splash and transition to play after a delay
    changeScene(scenes.splash);

    // Auto-transition to play scene after 5 seconds
    setTimeout(() => {
      changeScene(scenes.play);
    }, 5000);
  }

  setupQuizUI(me, shared);
  setupChooseTypeUI(me);
  setupUpgradeMarketUI(me);
};

window.draw = function () {
  currentScene?.update?.();
  currentScene?.draw?.();
};

for (const event of p5Events) {
  window[event] = () => currentScene?.[event]?.();
}

/// changeScene
// call this to tell the game to switch to a different scene
export function changeScene(newScene) {
  if (!newScene) {
    console.error("newScene not provided");
    return;
  }
  if (newScene === currentScene) {
    console.error("newScene is already currentScene");
    return;
  }
  currentScene?.leave?.();
  currentScene = newScene;
  currentScene.enter?.();
}
