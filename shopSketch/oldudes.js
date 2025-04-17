const width = window.innerWidth;
const height = window.innerHeight;
const bgColor = "#FBF9F4";

const shopInfo = {
  type: shopTypes.bakery,
  items: Object.values(bakeryInventoryTypes),
  x: 500,
  y: height / 3,
  dudes: [],
  images: [],
};

const shopInfo2 = {
  type: shopTypes.books,
  items: Object.values(bookInventoryTypes),
  x: width / 2 - 50,
  y: height / 3,
  dudes: [],
  images: [],
};

const dudeImages = [];
const numDudes = 2;

const shopData = {
  1: shopInfo,
  2: shopInfo2,
};

function preload() {
  preloadDudes();
}

function setup() {
  console.log(shopInfo);
  createCanvas(width, height);
  background(bgColor);
  setupDudes();
}

function draw() {
  background(bgColor);
  noFill();
  drawDudes();
}

function preloadDudes() {
  for (const shopInfo of Object.values(shopData)) {
    for (const item of shopInfo.items) {
      shopInfo.images[item] = loadImage(`./images/${shopInfo.type}_items/${item}.png`);
    }
  }
  for (let i = 0; i < numDudes; i++) {
    dudeImages.push(loadImage(`./images/dudes/${i}.png`));
  }
}

function setupDudes() {
  for (const shopInfo of Object.values(shopData)) {
    for (let i = 0; i < 2; i++) {
      const speed = random() * 2 + 0.5;
      const y = (random() * height) / 2 + height / 2;
      const dude = new Dude(0, y, shopInfo, speed);
      shopInfo.dudes.push(dude);
    }
  }
}

function drawDudes() {
  for (const shopInfo of Object.values(shopData)) {
    noFill();
    stroke("black");
    rect(shopInfo.x - 50, shopInfo.y - 50, 100, 100);
    for (const dude of shopInfo.dudes) {
      dude.update();
    }
  }
}

class Dude {
  constructor(x, y, shopInfo, speed, items = []) {
    // Positioning
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.vx = speed;
    this.vy = 0;

    // Drawing the dude
    this.items = items;
    this.type = random([0, 1]);
    this.alive = true;

    // Shop-specific stuff
    this.xEnd = shopInfo.x;
    this.yEnd = shopInfo.y;
    this.shopInfo = shopInfo;
  }

  update() {
    if (this.alive) {
      this.move();
      this.checkEnd();
      this.draw();
    }
  }

  checkEnd() {
    if (this.x >= width - 10) {
      this.alive = false;
    } else if (dist(this.x, this.y, this.xEnd, this.yEnd) < 10) {
      this.xEnd = width;
      const item = random(this.shopInfo.items);
      this.items.push(item);
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
      image(this.shopInfo.images[item], this.x + 4, this.y + 4, 20, 20);
    }
  }
}
