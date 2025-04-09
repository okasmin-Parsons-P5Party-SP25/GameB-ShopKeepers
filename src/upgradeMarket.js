import {me} from "./playScene";

const upgradeMarketButton = document.getElementById("upgrade-market-button");
const closeButton = document.getElementById("close-upgrade-market");
const upgradeMarketDiv = document.getElementById("upgrade-market");

const onClickUpgradeMarket = () => {
  upgradeMarketDiv.classList.remove("hidden");
};

const onClickClose = () => {
  upgradeMarketDiv.classList.add("hidden");
};

export const setupUpgradeMarketUI = () => {
  upgradeMarketButton.addEventListener("click", onClickUpgradeMarket);
  closeButton.addEventListener("click", onClickClose);
};

// TODO iterate through available upgrades for that shop type and display
// each as a button and when click it updates me object



// see how much money I have
// display all upgrades
// different styling depending on if can afford or not

// buy upgrade
// re-draw shop
// decrease money
// update other state if needed


const currentFunds = me.money;

const drawUpgradeOptions = () => {

};