import * as titleScene from "./titleScene.js";
import * as playScene from "./playScene.js";
import { setupQuizUI } from "./quiz.js";
import { setupChooseTypeUI } from "./chooseShopType.js";
import { setupUpgradeMarketUI } from "./upgradeMarket.js";

import { p5Events, canvasDims } from "./utilities.js";

let currentScene; // the scene being displayed

// all the available scenes
export const scenes = {
  title: titleScene,
  play: playScene,
};

window.preload = function () {
  Object.values(scenes).forEach((scene) => scene.preload?.());
};

window.setup = function () {
  createCanvas(canvasDims.width, canvasDims.height);
  noFill();
  noStroke();

  Object.values(scenes).forEach((scene) => scene.setup?.());
  changeScene(scenes.play);

  setupQuizUI();
  setupChooseTypeUI();
  setupUpgradeMarketUI();
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
