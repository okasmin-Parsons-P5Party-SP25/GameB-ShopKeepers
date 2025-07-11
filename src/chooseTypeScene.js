import {
  bgColor,
  // canvasDims,
  closeAllPopups,
} from "./utilities.js";
import { addTexture } from "./game_scene/shop.js";
// import { changeScene, scenes } from "./main.js";
import { onOpenChooseType } from "./chooseShopType.js";
// import { me } from "./main.js";

let speckleTextureImage;
let textureImage;

/**
 * sceneTemplate.js
 *
 * this is an example of a scene module
 *
 * scene modules split a p5 sketch up into different scenes. each scene
 * is like a partial p5 sketch with its own preload(), setup(), draw(), etc
 *
 * scenes help organize complex code by encapsulating related state and code
 * into isolated modules.
 *
 * since scenes are in modules, they don't share variables unless explicitedly
 * exported and imported.
 *
 * scene modules provide several "lifecycle" functions that are called
 * by main.js at important times.
 *
 * only one scene is "active" at a time. the active scene receives
 * update() and draw() calls and event calls like mousePressed()
 *
 */

// preload
// called once from the main preload()
// use this to load any assets you need for the scene
export function preload() {
  textureImage = loadImage("./assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("./assets/textures/cardboard-texture.jpg");
}

// setup
// called once from the main setup()
// *one time* code that SHOULD NOT rerun every time the scene is entered
export function setup() {}

// enter
// called from changeScene() when this scene is entered
// code that SHOULD rerun every time the scene is entered
export function enter() {
  closeAllPopups();
  // console.log("should open choose shop type popup");
  onOpenChooseType();
}

// update
// called from the main draw() loop
// code that updates the state of the scene (changes variables)
// should NOT have draw code in it
export function update() {}

// draw
// called from the main draw() loop
// code that draws the scene
// should NOT have update code in it
export function draw() {
  background(bgColor);
  addTexture(speckleTextureImage, textureImage);

  push();
  stroke("green");
  textSize(30);
  // text("choose shop type screen", canvasDims.width / 2, canvasDims.height / 2);
  pop();
}

// mousePressed
// called from the main mousePressed() function
// code that handles mousePressed events
export function mousePressed() {
  // changeScene(scenes.quiz);
}

// leave
// called from changeScene() when this scene is exited
// code that SHOULD run every time the scene is exited
export function leave() {}
