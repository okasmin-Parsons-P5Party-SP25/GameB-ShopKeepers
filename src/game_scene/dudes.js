import {
  dudeImages,
  itemImages,
  canvasDims,
  purchaseDetectionRadius,
  dudeGetAllInventory,
  dudeBuySingleItem,
} from "../utilities.js";

export function preloadDudes() {
  for (let i = 0; i < 2; i++) {
    dudeImages.push(loadImage(`./assets/dudes/${i}.png`));
  }
}
export function setUpDudes(guest, shopX, shopY) {
  const itemStrings = dudeGetAllInventory(guest);
  for (let i = 0; i < itemStrings.length; i++) {
    const speed = random() * 3 + 1.5;
    const startX = 0;
    const startY = (random() * height) / 2 + height / 2;

    const dude = {
      x: startX,
      y: startY,
      speed,
      vx: speed,
      vy: 0,
      items: [],
      type: random([0, 1]),
      alive: true,
      xEnd: shopX,
      yEnd: shopY,
      purchaseItem: itemStrings[i].itemString,
      purchaseItemIdx: itemStrings[i].itemIdx,
    };
    guest.dudes.push(dude);
  }
}

export function drawDudes(guest) {
  for (const dude of guest.dudes) {
    updateDude(dude, guest);
  }
}

const updateDude = (dude, guest) => {
  if (dude.alive) {
    moveDude(dude);
    checkEndDude(dude, guest);
    drawDude(dude);
  }
};
const checkEndDude = (dude, guest) => {
  if (dude.x >= canvasDims.width - 10 || dude.y >= canvasDims.height - 10) {
    //he is dead
    dude.alive = false;
    console.log("dead dude");
  } else if (dist(dude.x, dude.y, dude.xEnd, dude.yEnd) < purchaseDetectionRadius) {
    //buying the item
    dude.xEnd = canvasDims.width;
    if (dude.items.length === 0) {
      dude.items.push(dude.purchaseItem);
      dudeBuySingleItem(guest, dude.purchaseItemIdx);
    }
  }
};
const moveDude = (dude) => {
  const dx = dude.xEnd - dude.x;
  const dy = dude.yEnd - dude.y;
  const nZoom = 0.01;
  const n = noise(nZoom * dude.x, nZoom * dude.y) * 2 - 0.5;
  angleMode(RADIANS);
  const angle = Math.atan2(dy, dx);

  dude.vx = cos(angle);
  dude.vy = sin(angle);

  dude.x += dude.vx * dude.speed;
  dude.y += dude.vy * dude.speed + n;
};
const drawDude = (dude) => {
  image(dudeImages[dude.type], dude.x, dude.y, 20, 35);
  if (dude.items.length > 0) {
    for (const item of dude.items) {
      if (itemImages[item]) {
        image(itemImages[item], dude.x + 4, dude.y + 4, 20, 20);
      }
    }
  }
};
