import {
  inventoryTypes,
  getInventoryCost,
  upgradeTypes,
  getUpgradeCost,
  closeAllPopups,
} from "./utilities.js";

const upgradeMarketButton = document.getElementById("upgrade-market-button");
const closeButton = document.getElementById("close-upgrade-market");
const upgradeMarketDiv = document.getElementById("upgrade-market");
const inventoryDiv = document.getElementById("inventory-choices");
const upgradesDiv = document.getElementById("shop-upgrade-choices");

const inventoryNameMap = {
  plant1: "Rubber",
  plant2: "Fern",
  plant3: "Cactus",
  book1: "Short Story",
  book2: "Novel",
  card: "B-Day Card",
};

const getCoinHTML = (amount) => {
  return `<span>${amount}<img src="./assets/coin.png" style="width: 25px; height: 25px; vertical-align: middle;" /></span>`;
};

// open
const onClickUpgradeMarket = () => {
  closeAllPopups();
  upgradeMarketDiv.classList.remove("hidden");
};
// close
const onClickClose = () => {
  upgradeMarketDiv.classList.add("hidden");
};

export const setupUpgradeMarketUI = (me) => {
  upgradeMarketButton.addEventListener("click", onClickUpgradeMarket);
  closeButton.addEventListener("click", onClickClose);

  // Setup tab switching
  const tabButtons = upgradeMarketDiv.querySelectorAll(".tab-button");
  const inventoryTab = document.getElementById("inventory-tab");
  const upgradesTab = document.getElementById("shop-upgrades-tab");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (btn.dataset.tab === "inventory") {
        inventoryTab.classList.remove("hidden");
        upgradesTab.classList.add("hidden");
      } else {
        inventoryTab.classList.add("hidden");
        upgradesTab.classList.remove("hidden");
      }
    });
  });

  generateUpgradeMarket(me);
};

const handleBuyInventory = (me, idx, cost) => {
  // check if can afford
  if (cost > me.coins) {
    // TODO make this visible in UI somehow
    console.log("cannot afford");
    return;
  }
  // add to inventory
  me.inventory[idx] += 1;
  // deduct coins
  me.coins -= cost;

  // make sure market UI reflects new ammount
  updateAmountText(me, idx);
};

export const updateAmountText = (me, idx) => {
  const el = document.getElementById(`market-supply-${idx}`);
  if (el) {
    el.textContent = `${me.inventory[idx]}`;
  }
};

const updateSellText = (me, idx, el = undefined, sell = undefined) => {
  let ammount = sell;
  let div = el;
  if (!el) {
    div = document.getElementById(`inventory-item-sell-${idx}`);
  }
  if (!sell) {
    ammount = getInventoryCost(idx, me).sell;
  }

  div.innerHTML = `sell<br>${getCoinHTML(ammount)}`;
};

export const setInventory = (me) => {
  inventoryDiv.innerHTML = "";
  if (!me.shopType) return;

  const { shopType } = me;
  const inventoryChoices = inventoryTypes[shopType];
  inventoryChoices.forEach((inventory, idx) => {
    // note: idx here refers to the inventory level

    const button = document.createElement("button");
    button.classList.add("market-choice-button");
    // button.id = `inventory-${idx}`;

    const itemDiv = document.createElement("div");

    const itemImageContainer = document.createElement("div");
    itemImageContainer.classList.add("item");

    // Image
    const img = document.createElement("img");
    img.src = `assets/${me.shopType}/items/${inventory.toLowerCase()}.png`; // normalize
    img.alt = inventory;
    img.classList.add("item-image");
    img.onerror = () => {
      img.src = "assets/bakery/default.png"; // fallback if image not found
    };

    // Label
    const label = document.createElement("span");
    label.textContent = inventoryNameMap[inventory] || inventory;
    label.classList.add("item-label");

    itemImageContainer.appendChild(img);
    itemImageContainer.appendChild(label);
    itemDiv.append(itemImageContainer);

    const { buy, sell } = getInventoryCost(idx, me);

    const buyDiv = document.createElement("div");
    buyDiv.classList.add("buy");
    buyDiv.innerHTML = `buy<br>${getCoinHTML(buy)}`;
    itemDiv.append(buyDiv);

    const sellDiv = document.createElement("div");
    sellDiv.classList.add("sell");
    sellDiv.id = `inventory-item-sell-${idx}`;
    updateSellText(me, idx, sellDiv, sell);
    itemDiv.append(sellDiv);

    const ammountDiv = document.createElement("div");
    ammountDiv.id = `market-supply-${idx}`;
    ammountDiv.classList.add("supply");
    ammountDiv.textContent = `${me.inventory[idx]}`;
    itemDiv.append(ammountDiv);

    button.append(itemDiv);

    button.addEventListener("click", () => handleBuyInventory(me, idx, buy, ammountDiv));

    inventoryDiv.append(button);
  });
};

const handleBuyUpgrade = (me, idx, cost, purchasedDiv, buttonEl) => {
  // check if can afford
  if (cost > me.coins) {
    console.log("cannot afford");
    return;
  }

  // check if already bought this upgrade
  if (me.upgrades[idx]) {
    console.log("already got this");
    return;
  }

  me.upgrades[idx] = true;
  me.upgradeLevel += 1;
  me.coins -= cost;

  updatePurchasedText(me, purchasedDiv, idx);

  // ✅ Add the purchased-item class
  buttonEl.classList.add("purchased-item");

  // apply the upgrade price multiplier to each item
  for (let i = 0; i < 3; i++) {
    updateSellText(me, i);
  }
};


const updatePurchasedText = (me, el, idx) => {
  el.textContent = el.textContent + (me.upgrades[idx] === true ? " purchased" : "");
};

const setUpgrades = (me) => {
  upgradeTypes.forEach((upgrade, idx) => {
    // note: idx here refers to the inventory level
    const button = document.createElement("button");
    // button.id = `upgrade-${idx}`;
    button.classList.add("market-choice-button", "market-choice-upgrade");

    const itemDiv = document.createElement("div");

    const itemImageContainer = document.createElement("div");
    itemImageContainer.classList.add("item");

/*     // Create the image element
    const img = document.createElement("img");
    img.src = `assets/${me.shopType}/upgrades/decor/full-decor.png`;
    img.alt = upgrade;
    img.classList.add("item-image");
    img.onerror = () => {
      img.src = ""; // fallback image
    };

    itemImageContainer.appendChild(img); */

    // Optionally, add a label or keep the text name below the image
    const label = document.createElement("span");
    label.textContent = upgrade;
    label.classList.add("item-label");
    itemImageContainer.appendChild(label);

    itemDiv.append(itemImageContainer);

    const { buy } = getUpgradeCost(idx);

    const buyDiv = document.createElement("div");
    buyDiv.classList.add("buy");
    buyDiv.innerHTML = `buy<br>${getCoinHTML(buy)}`;
    itemDiv.append(buyDiv);

    const purchasedDiv = document.createElement("div");
    updatePurchasedText(me, purchasedDiv, idx);
    itemDiv.append(purchasedDiv);

    button.append(itemDiv);

    button.addEventListener("click", () => handleBuyUpgrade(me, idx, buy, purchasedDiv));
    upgradesDiv.append(button);
  });
};

const generateUpgradeMarket = (me) => {
  // this differs based on shop type
  setInventory(me);

  // consistent for each shop type
  setUpgrades(me);
};