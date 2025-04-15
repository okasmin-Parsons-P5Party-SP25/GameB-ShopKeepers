import * as playScene from "./playScene.js";
import { setupQuizUI } from "./quiz.js";
import { setupChooseTypeUI } from "./chooseShopType.js";
import { setupUpgradeMarketUI } from "./upgradeMarket.js";

import { p5Events, canvasDims } from "./utilities.js";


export let shared;
export let guests;
export let me;

// all the available scenes
export const scenes = {
  play: playScene,
};

let currentScene; // the scene being displayed


window.preload = function () {
    partyConnect("wss://demoserver.p5party.org", "shop_keepers");

    shared = partyLoadShared("shared", {
      quizCoins: 100
    });


  me = partyLoadMyShared({
    shopType: undefined, // one of shopTypes,
    inventory: [], // list of inventoryTypes (increment from questions, decrement when bought)
    money: 0, // number (increment from sell inventory, decrement when buy upgrades)
    upgrades: [], // list of upgradeTypes
  });

  guests = partyLoadGuestShareds();
  Object.values(scenes).forEach((scene) => scene.preload?.());
};

window.setup = function () {
  createCanvas(canvasDims.width, canvasDims.height);
  noFill();
  noStroke();

  Object.values(scenes).forEach((scene) => scene.setup?.());
  changeScene(scenes.play);

  setupQuizUI();
  setupChooseTypeUI(me);
  setupUpgradeMarketUI();
};

window.draw = function () {
  currentScene?.update?.();
  currentScene?.draw?.();
  playScene.drawShops(guests);
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
