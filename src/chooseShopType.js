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
    // Create container for each shop type option
    const optionContainer = document.createElement("div");
    optionContainer.className = "shop-type-option";

    // Create and add the label
    const label = document.createElement("div");
    label.className = "shop-type-label";
    label.textContent = type.toUpperCase();
    optionContainer.appendChild(label);

    // Create and add the button
    const typeButton = document.createElement("button");
    typeButton.setAttribute("data-type", type);

    // Special handling for bakery button
    if (type === "bakery") {
      const bakeryImage = document.createElement("img");
      bakeryImage.src = "/assets/bakery/items/bwcookie.PNG";
      bakeryImage.alt = "BAKERY";
      typeButton.appendChild(bakeryImage);
    }

    typeButton.addEventListener("click", () => onChooseShop(me, type));

    optionContainer.appendChild(typeButton);
    typesDiv.appendChild(optionContainer);
  });
};
