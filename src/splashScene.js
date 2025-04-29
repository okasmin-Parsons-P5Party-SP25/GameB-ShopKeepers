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
  animationContainer.style.position = "fixed";
  animationContainer.style.top = "0";
  animationContainer.style.left = "0";
  animationContainer.style.width = "100vw";
  animationContainer.style.height = "100vh";
  animationContainer.style.display = "flex";
  animationContainer.style.justifyContent = "center";
  animationContainer.style.alignItems = "center";
  animationContainer.style.zIndex = "1000";
  animationContainer.style.backgroundColor = "#000";
  animationContainer.style.overflow = "hidden";

  // Create start button
  const startButton = document.createElement("button");
  startButton.textContent = "START";
  startButton.style.position = "absolute";
  startButton.style.bottom = "50px"; // Position from bottom
  startButton.style.zIndex = "1001"; // Ensure button is above animation
  startButton.style.padding = "15px 30px"; // Add more padding
  animationContainer.appendChild(startButton);

  document.body.appendChild(animationContainer);

  // Load the animation
  animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/public/assets/intro-lottie.json",
  });

  // Handle animation scaling
  animation.addEventListener("DOMLoaded", () => {
    const svg = animationContainer.querySelector("svg");
    if (svg) {
      svg.style.position = "absolute";
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.transform = "scale(1.2)"; // Scale up slightly to ensure coverage
      svg.style.transformOrigin = "center center";
    }
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
