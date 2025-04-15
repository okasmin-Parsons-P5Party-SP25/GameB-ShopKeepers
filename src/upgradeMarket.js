import { inventoryTypes, getInventoryCost, upgradeTypes, getUpgradeCost } from "./utilities.js";

const upgradeMarketButton = document.getElementById("upgrade-market-button");
const closeButton = document.getElementById("close-upgrade-market");
const upgradeMarketDiv = document.getElementById("upgrade-market");
const inventoryDiv = document.getElementById("inventory-choices");
const upgradesDiv = document.getElementById("shop-upgrade-choices");

// open
const onClickUpgradeMarket = () => {
  upgradeMarketDiv.classList.remove("hidden");
};
// close
const onClickClose = () => {
  upgradeMarketDiv.classList.add("hidden");
};

export const setupUpgradeMarketUI = (me) => {
  upgradeMarketButton.addEventListener("click", onClickUpgradeMarket);
  closeButton.addEventListener("click", onClickClose);

  generateUpgradeMarket(me);
};

const handleBuyInventory = (me, idx, cost, ammountDiv) => {
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

  // make sure UI reflects new ammount
  updateAmountText(me, ammountDiv, idx);
};

const updateAmountText = (me, el, idx) => {
  el.textContent = `currently have: ${me.inventory[idx]} of this item`;
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

  div.textContent = `sell for: ${ammount} coins`;
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

    // TODO render image here instead of text
    const itemImageContainer = document.createElement("div");
    itemImageContainer.textContent = inventory;
    itemDiv.append(itemImageContainer);

    const { buy, sell } = getInventoryCost(idx, me);

    const buyDiv = document.createElement("div");
    buyDiv.textContent = `buy for: ${buy} coins`;
    itemDiv.append(buyDiv);

    const sellDiv = document.createElement("div");
    sellDiv.id = `inventory-item-sell-${idx}`;
    updateSellText(me, idx, sellDiv, sell);
    itemDiv.append(sellDiv);

    const ammountDiv = document.createElement("div");
    updateAmountText(me, ammountDiv, idx);
    itemDiv.append(ammountDiv);

    button.append(itemDiv);

    button.addEventListener("click", () => handleBuyInventory(me, idx, buy, ammountDiv));

    inventoryDiv.append(button);
  });
};

const handleBuyUpgrade = (me, idx, cost, purchasedDiv) => {
  // check if can afford
  if (cost > me.coins) {
    // TODO make this visible in UI somehow
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

  // apply the upgrade price multiplier to each item
  for (let i = 0; i < 3; i++) {
    updateSellText(me, i);
  }
};

const updatePurchasedText = (me, el, idx) => {
  el.textContent = me.upgrades[idx] ? "already got this" : " ";
};

const setUpgrades = (me) => {
  upgradeTypes.forEach((upgrade, idx) => {
    // note: idx here refers to the inventory level
    const button = document.createElement("button");
    // button.id = `upgrade-${idx}`;
    button.classList.add("market-choice-button");

    const itemDiv = document.createElement("div");

    // TODO render image here instead of text?
    const itemImageContainer = document.createElement("div");
    itemImageContainer.textContent = upgrade;
    itemDiv.append(itemImageContainer);

    const { buy } = getUpgradeCost(idx);

    const buyDiv = document.createElement("div");
    buyDiv.textContent = `buy for: ${buy} coins`;
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
