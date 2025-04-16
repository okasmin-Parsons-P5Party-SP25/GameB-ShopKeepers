const width = window.innerWidth;
const height = window.innerHeight;
const bgColor = "#FBF9F4";

let shopInfo = {
  type: shopTypes.bakery,
  items: Object.values(bakeryInventoryTypes),

  x: 200,
  y: height / 3,

  dudes: [],
  images: [],
};

let shopInfo2 = {
  type: shopTypes.books,
  items: Object.values(bookInventoryTypes),

  x: width / 2 - 50,
  y: height / 3,

  dudes: [],
  images: [],
};
let dudeImages = [];
let numDudes = 100;
let shopData = {
  1: shopInfo,
  2: shopInfo2,
};

// REMOVE THIS STUFF
function preload() {
  preload_dudes();
}

function setup() {
  console.log(shopInfo);
  createCanvas(width, height);
  background(bgColor);
  setup_dudes();
}

function draw() {
  background(bgColor);
  noFill();
  draw_dudes();
}

// CODE IS THIS STUFF
function preload_dudes() {
  for (let [i, shopInfo] of Object.entries(shopData)) {
    for (const item of shopInfo.items) {
      shopInfo.images[item] = loadImage(`./images/${shopInfo.type}_items/${item}.png`);
    }
  }
  for (let i = 0; i < 2; i++) {
    dudeImages.push(loadImage(`./images/dudes/${i}.png`));
  }
}

function setup_dudes() {
  for (let [id, shopInfo] of Object.entries(shopData)) {
    for (i = 0; i < numDudes; i++) {
      let speed = random() * 2 + 0.5;
      let y = (random() * height) / 2 + height / 2;
      let dude = new Dude(0, y, id, speed);
      console.log(shopInfo);
      shopInfo["dudes"].push(dude);
    }
  }
}

function draw_dudes() {
  for (let shopInfo of Object.values(shopData)) {
    noFill();
    stroke("black");
    rect(shopInfo.x - 50, shopInfo.y - 50, 100, 100);
    for (let dude of shopInfo.dudes) {
      dude.update();
    }
  }
}

class Dude {
  constructor(x, y, shop_id, speed, items = []) {
    //positioning
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.vx = speed;
    this.vy = 0;

    //drawing the dude
    this.items = items;
    this.type = random([0, 1]);
    this.alive = true;

    //shop specific stuff
    this.xEnd = shopData[shop_id].x;
    this.yEnd = shopData[shop_id].y;
    this.shopId = shop_id;
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
      let item = random(shopData[this.shopId].items);
      this.items.push(item);
    }
  }

  move() {
    let dx = this.xEnd - this.x;
    let dy = this.yEnd - this.y;
    let nZoom = 0.01;
    let n = (noise(nZoom * this.x, nZoom * this.y) - 0.5) * 2;

    let angle = Math.atan2(dy, dx);

    this.vx = cos(angle);
    this.vy = sin(angle);

    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed + n;
  }

  draw() {
    image(dudeImages[this.type], this.x, this.y, 20, 35);
    // rect(this.x,this.y, 5,15)

    for (let item of this.items) {
      // fill('red')
      // text(item, this.x,this.y)
      image(shopData[this.shopId].images[item], this.x + 4, this.y + 4, 20, 20);
    }
  }
}
