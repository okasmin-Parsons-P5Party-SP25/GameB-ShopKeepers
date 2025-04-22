import {
  dudeImages,
  itemImages,
  canvasDims,
  purchaseDetectionRadius,
  dudeBuyInventory,
} from "../utilities.js";

export function preloadDudes() {
  for (let i = 0; i < 2; i++) {
    dudeImages.push(loadImage(`./assets/dudes/${i}.png`));
  }
}
export function setUpDudes(guest, guestIdx, shopX, shopY, numDudes) {
  for (let i = 0; i < numDudes; i++) {
    const speed = random() * 2.5 + 0.5;
    const startX = 0;
    const startY = (random() * height) / 2 + height / 2;

    // TODO this updates the guest's inventory and coins when the dudes are first initiated
    // so it doesn't line up with the time that they actually grab the item
    const purchaseItem = dudeBuyInventory(guest);
    const dude = new Dude(startX, startY, shopX, shopY, purchaseItem, speed);
    guest.dudes.push(dude);
  }
}

export function drawDudes(guest) {
  for (const dude of guest.dudes) {
    dude.update();
  }
}

export class Dude {
  constructor(x, y, xEnd, yEnd, purchaseItem, speed) {
    // Positioning
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.vx = speed;
    this.vy = 0;

    // Drawing the dude
    this.items = [];
    this.type = random([0, 1]);
    this.alive = true;

    // Shop-specific stuff
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.purchaseItem = purchaseItem;
  }

  update() {
    if (this.alive) {
      this.move();
      this.checkEnd();
      this.draw();
    }
  }

  checkEnd() {
    if (this.x >= canvasDims.width - 10) {
      //he is dead
      this.alive = false;
      console.log("dead dude");
    } else if (dist(this.x, this.y, this.xEnd, this.yEnd) < purchaseDetectionRadius) {
      // console.log("dude trying to buy something");
      //buying the item
      this.xEnd = canvasDims.width;
      this.items.push(this.purchaseItem);
    }
  }

  move() {
    const dx = this.xEnd - this.x;
    const dy = this.yEnd - this.y;
    const nZoom = 0.01;
    const n = noise(nZoom * this.x, nZoom * this.y) * 2 - 0.5;
    angleMode(RADIANS);
    const angle = Math.atan2(dy, dx);

    this.vx = cos(angle);
    this.vy = sin(angle);

    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed + n;
  }

  draw() {
    image(dudeImages[this.type], this.x, this.y, 20, 35);
    if (this.items.length > 0) {
      for (const item of this.items) {
        if (itemImages[item]) {
          image(itemImages[item], this.x + 4, this.y + 4, 20, 20);
        }
      }
    }
  }
}
