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
  console.log(`Shop type selected: ${type}`);

  // Add black border to selected button
  const selectedButton = document.querySelector(`button[data-type="${type}"]`);
  if (selectedButton) {
    selectedButton.style.border = "2px solid black";
  }

  // Activate continue button
  const continueButton = chooseTypeDiv.querySelector(".continue-button");
  if (continueButton) {
    continueButton.classList.remove("inactive");
  }

  // update market to reflect chosen shop type for inventory
  setInventory(me);

  // reset button text
  chooseTypeButton.textContent = `my shop type: ${type}`;
};

export const setupChooseTypeUI = (me) => {
  chooseTypeButton.addEventListener("click", () => onClickChooseType(me));
  closeButton.addEventListener("click", onClickClose);

  // Add title
  const title = document.createElement("h1");
  title.textContent = "CHOOSE YOUR SHOP";
  chooseTypeDiv.insertBefore(title, typesDiv);

  // Create and add continue button (initially inactive)
  const continueButton = document.createElement("button");
  continueButton.textContent = "CONTINUE";
  continueButton.className = "continue-button inactive";
  continueButton.addEventListener("click", () => {
    chooseTypeDiv.classList.add("hidden");
  });
  chooseTypeDiv.appendChild(continueButton);

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

    // Special handling for shop type buttons
    if (type === "bakery") {
      const bakeryImage = document.createElement("img");
      bakeryImage.src = "/assets/bakery/items/bwcookie.PNG";
      bakeryImage.alt = "BAKERY";
      typeButton.appendChild(bakeryImage);
    } else if (type === "plant") {
      const plantImage = document.createElement("img");
      plantImage.src = "/public/assets/plant/items/plant1.PNG";
      plantImage.alt = "PLANT";
      typeButton.appendChild(plantImage);
    } else if (type === "books") {
      const booksImage = document.createElement("img");
      booksImage.src = "/public/assets/books/items/book2.PNG";
      booksImage.alt = "BOOKS";
      typeButton.appendChild(booksImage);
    }

    typeButton.addEventListener("click", () => onChooseShop(me, type));

    optionContainer.appendChild(typeButton);
    typesDiv.appendChild(optionContainer);
  });
};
