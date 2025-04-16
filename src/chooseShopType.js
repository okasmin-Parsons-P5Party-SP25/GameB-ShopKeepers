import { shopTypes, closeAllPopups } from "./utilities";
import { setInventory } from "./upgradeMarket";

/**
 *  get relevant HTML elements
 */
const chooseTypeButton = document.getElementById("choose-type-button");
const chooseTypeDiv = document.getElementById("choose-type");
const typesDiv = document.getElementById("type-choices");
const closeButton = document.getElementById("close-choose-type");

// open
const onClickChooseType = (me) => {
  if (me.shopType) return;

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

export const setupChooseTypeUI = (me) => {
  chooseTypeButton.addEventListener("click", () => onClickChooseType(me));
  closeButton.addEventListener("click", onClickClose);

  Object.values(shopTypes).forEach((type) => {
    const typeButton = document.createElement("button");
    typeButton.textContent = type.toUpperCase();

    typeButton.addEventListener("click", () => onChooseShop(me, type));

    typesDiv.appendChild(typeButton);
  });
};
