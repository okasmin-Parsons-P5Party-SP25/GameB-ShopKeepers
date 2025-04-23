import lottie from "lottie-web";
import { canvasDims } from "./utilities.js";

let animation;
let animationContainer;
let isInitialized = false;

export function preload() {
  // Preload function if needed
}

export function setup() {
  if (isInitialized) return;

  // Create a container for the animation
  animationContainer = document.createElement("div");
  animationContainer.id = "splash-animation";
  animationContainer.style.position = "absolute";
  animationContainer.style.top = "0";
  animationContainer.style.left = "0";
  animationContainer.style.width = "100%";
  animationContainer.style.height = "100%";
  animationContainer.style.display = "flex";
  animationContainer.style.justifyContent = "center";
  animationContainer.style.alignItems = "center";
  animationContainer.style.zIndex = "1000";
  animationContainer.style.backgroundColor = "#000";

  document.body.appendChild(animationContainer);

  // Load the animation
  animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/open-screen-animation-1.json", // Assuming the file is in the public directory
  });

  isInitialized = true;
}

export function draw() {
  // Nothing to draw as Lottie handles the animation
}

export function update() {
  // No update needed for the animation
}

export function enter() {
  if (animationContainer) {
    animationContainer.style.display = "flex";
  }
}

export function leave() {
  if (animationContainer) {
    animationContainer.style.display = "none";
  }
}
