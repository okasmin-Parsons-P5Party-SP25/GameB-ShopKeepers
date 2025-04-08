import { me } from "./playScene";
import { shopTypes } from "./utilities";

/**
 *  get relevant HTML elements
 */
const chooseTypeButton = document.getElementById("choose-type-button");
const chooseTypeDiv = document.getElementById("choose-type");
const typesDiv = document.getElementById("type-choices");
const closeButton = document.getElementById("close-choose-type");

const onClickChooseType = () => {
  chooseTypeDiv.classList.toggle("hidden");
};

const onClickClose = () => {
  chooseTypeDiv.classList.add("hidden");
};

export const setupChooseTypeUI = () => {
  console.log("me", me);
  chooseTypeButton.addEventListener("click", onClickChooseType);
  closeButton.addEventListener("click", onClickClose);

  Object.values(shopTypes).forEach((type) => {
    const typeButton = document.createElement("button");
    typeButton.textContent = type.toUpperCase();

    typeButton.addEventListener("click", () => {
      me.shopType = type;
    });

    typesDiv.appendChild(typeButton);
  });
};
