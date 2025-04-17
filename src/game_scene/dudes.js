import {
  dudeImages,
  itemImages,
  inventoryTypes,
  dudeBuyInventory,
  canvasDims,
} from "../utilities.js";

function preloadDudes() {
  for (let i = 0; i < 2; i++) {
    dudeImages.push(loadImage(`..assets/dudes/${i}.png`));
  }
}
// shop has this:{shopType, inventory = {}, numDudes =, x,y, dudes = []}
function setUpDudes(guest, shopX, shopY, numDudes) {
  for (let i = 0; i < numDudes; i++) {
    const speed = random() * 2 + 0.5;
    //starting y position
    const startX = 0;
    const startY = (random() * height) / 2 + height / 2;

    // guest.inventory = [3,2,0]
    const inventoryItems = inventoryTypes[guest.shopType];

    const dude = new Dude(startX, startY, shopX, shopY, guest, speed);
    guest.dudes.push(dude);
  }
}

function drawDudes(guest) {
  for (const dude of guest.dudes) {
    dude.update();
  }
}

class Dude {
  constructor(x, y, xEnd, yEnd, guest, speed) {
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
    this.guest = guest;
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
    } else if (dist(this.x, this.y, this.xEnd, this.yEnd) < 10) {
      //buying the itme
      this.xEnd = canvasDims.width;
      const purchaseItem = dudeBuyInventory(this.guest);
      this.items.push(purchaseItem);
    }
  }

  move() {
    const dx = this.xEnd - this.x;
    const dy = this.yEnd - this.y;
    const nZoom = 0.01;
    const n = (noise(nZoom * this.x, nZoom * this.y) - 0.5) * 2;

    const angle = Math.atan2(dy, dx);

    this.vx = cos(angle);
    this.vy = sin(angle);

    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed + n;
  }

  draw() {
    image(dudeImages[this.type], this.x, this.y, 20, 35);
    for (const item of this.items) {
      image(itemImages[item], this.x + 4, this.y + 4, 20, 20);
    }
  }
}
