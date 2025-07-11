/* global lottie */
import { bgColor } from "./utilities.js";
import { addTexture } from "./game_scene/shop.js";
import { changeScene, scenes } from "./main.js";
let speckleTextureImage;
let textureImage;
let animation;
let animationContainer;
let startButton;
let isInitialized = false;
const logoImage = document.getElementById("logo");
const loadingDiv = document.getElementById("loading");

export function preload() {
  textureImage = loadImage("./assets/textures/white-paper-texture.jpg");
  speckleTextureImage = loadImage("./assets/textures/cardboard-texture.jpg");
}

export function setup() {
  if (isInitialized) return;

  animationContainer = document.getElementById("splash-animation");
  startButton = document.getElementById("start-button");

  if (!animationContainer || !startButton) {
    return;
  }

  // Load the animation
  animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "./assets/intro-lottie-2.json",
  });

  // need DOM to be loaded first so don't update svg until lottie is loaded
  animation.addEventListener("DOMLoaded", () => {
    startButton.style.display = "block";
    const svg = animationContainer.querySelector("svg");
    if (svg) {
      svg.classList.add("splash-animation-svg");
    }
  });

  isInitialized = true;
  loadingDiv.style.display = "none";
}

export function enter() {
  if (animationContainer) {
    animationContainer.style.display = "flex";
  }
}
export function update() {}

export function draw() {
  background(bgColor);
  addTexture(speckleTextureImage, textureImage);
}

export function mousePressed() {
  changeScene(scenes.chooseType);
}

export function leave() {
  logoImage.style.display = "block";
  if (animationContainer) {
    animationContainer.style.display = "none";
  }
}
