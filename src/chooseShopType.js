import { shopTypes, closeAllPopups } from "./utilities.js";
import { setInventory } from "./upgradeMarket.js";
import { changeScene, scenes } from "./main.js";

/**
 *  get relevant HTML elements
 */
const chooseTypeButton = document.getElementById("choose-type-button");
const chooseTypeDiv = document.getElementById("choose-type");
const typesDiv = document.getElementById("type-choices");
const closeButton = document.getElementById("close-choose-type");
const nextButton = document.getElementById("next-exit-choose-shop-button");

// open
export const onOpenChooseType = () => {
  // if (me.shopType) return;

  closeAllPopups();
  chooseTypeDiv.classList.remove("hidden");
};

//close
const onClickClose = () => {
  chooseTypeDiv.classList.add("hidden");
};

const onChooseShop = (me, type) => {
  if (me.shopType) return;

  me.shopType = type;

  // update market to reflect chosen shop type for inventory
  setInventory(me);

  // reset button text
  chooseTypeButton.textContent = `my shop type: ${type}`;
};

// next button to change scene
const onClickNext = (me) => {
  if (!me.shopType) return;
  onClickClose();
  changeScene(scenes.quiz);
};

export const setupChooseTypeUI = (me) => {
  chooseTypeButton.addEventListener("click", () => onOpenChooseType(me));
  closeButton.addEventListener("click", onClickClose);
  nextButton.addEventListener("click", () => onClickNext(me));

  Object.values(shopTypes).forEach((type) => {
    const typeButton = document.createElement("button");
    typeButton.textContent = type.toUpperCase();

    typeButton.addEventListener("click", () => onChooseShop(me, type));

    typesDiv.appendChild(typeButton);
  });
};
