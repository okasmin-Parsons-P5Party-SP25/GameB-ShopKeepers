import * as playScene from "./playScene.js";
import * as startScene from "./startScene.js";
import * as quizScene from "./quizScene.js";
import * as chooseTypeScene from "./chooseTypeScene.js";
import { setupQuizUI } from "./quiz.js";
import { setupChooseTypeUI } from "./chooseShopType.js";
import { setupUpgradeMarketUI } from "./upgradeMarket.js";
import DOMCursors from "./DOMCursors.js";
import {
  p5Events,
  canvasDims,
  myDudeStates,
  // godMode,
  // shopTypes,
  //  closeAllPopups
} from "./utilities.js";

export let shared;
export let guests;
export let me;

// all the available scenes
export const scenes = {
  play: playScene,
  start: startScene,
  quiz: quizScene,
  chooseType: chooseTypeScene,
};

let currentScene; // the scene being displayed

window.preload = function () {
  partyConnect("wss://demoserver.p5party.org", "shop_keepers_main_start");

  shared = partyLoadShared("shared", {
    quizCoins: 50, // amount of coins to be won during quiz - updates each round - see quiz.js
  });

  me = partyLoadMyShared({
    shopType: undefined, // one of shopTypes,
    inventory: [0, 0, 0], // index refers to inventory level, value is ammount; see inventoryTypes
    coins: 0, // number,
    upgrades: [false, false, false], // index refers to upgrade level, true if purchased
    upgradeLevel: 0, // increase to 1, 2, or 3 with each upgrade purchase
    dudes: [],
    dudesState: myDudeStates.none,
  });

  guests = partyLoadGuestShareds();
  Object.values(scenes).forEach((scene) => scene.preload?.());
};

window.setup = function () {
  createCanvas(canvasDims.width, canvasDims.height);
  noFill();
  noStroke();

  // Initialize the DOMCursors after canvas creation
  new DOMCursors(false);

  Object.values(scenes).forEach((scene) => scene.setup?.());

  // console.log("change scene before");
  // console.log({ me, shared });
  changeScene(scenes.start);
  // console.log("change scene after");

  setupQuizUI(me, shared);
  setupChooseTypeUI(me);
  setupUpgradeMarketUI(me);

  document.addEventListener("keydown", function (event) {
    if (event.key === "g") {
      toggleGodMode();
    }
  });
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
  //ensure all popups are closed when change scene
  // closeAllPopups();

  currentScene?.leave?.();
  currentScene = newScene;
  currentScene.enter?.();
}

const godModeUIContainer = document.getElementById("god-mode-container");
const godModeCloseButtons = document.querySelectorAll(".close-button-god-mode");

const toggleGodMode = () => {
  godModeUIContainer.classList.toggle("hidden");

  const godModeOn = !godModeUIContainer.classList.contains("hidden");
  if (godModeCloseButtons.style) {
    godModeCloseButtons.style.display = godModeOn ? "block" : "none";
  }
};
