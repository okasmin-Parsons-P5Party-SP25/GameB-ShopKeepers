const canvasWidth = 800;
const canvasHeight = 600;
const backgroundColor = "#FBF9F4";

const drawPlacementDot = false;

const modes = {
  bottomMiddle: 1,
  bottomCorner: 2,
  center: 3,
  topCorner: 4,
  backCorner: 5,
};

const faceType = {
  front: 1,
  side: 2,
  top: 3,
  bottomInner: 4,
  sideInner: 5,
  backInner: 6,
  backLight: 7,
};

const angle = 40;

const wallColors = {
  front: "#F2EBDC",
  side: "#ECE1CF",
  top: "#F5F1E7",
  inside: "#FAF1E1",
};

const shelfColors = {
  back: "#E8D7BB",
  side: "#F1E2CA",
  bottom: "#ECE1CF",
  bottomLight: "#ECE1CF",
};

let texture;
let speckleTexture;
let itemImages = {};

let bakeryUpgradeImages = {
  decor: { barrels: "", menu: "", sideshelf: "", roof: "" },
  light: { sign: "", signLight: "" },
};

function preload() {
  texture = loadImage("./images/textures/white-paper-texture.jpg");
  speckleTexture = loadImage("./images/textures/cardboard-texture.jpg");
  itemImages["cookie"] = loadImage("./images/bakery_items/cookie.png");
  itemImages["cake"] = loadImage("./images/bakery_items/cake.png");
  itemImages["bread"] = loadImage("./images/bakery_items/bread1.png");
  itemImages["croissant"] = loadImage("./images/bakery_items/croissant.png");
  itemImages["pie"] = loadImage("./images/bakery_items/pie.png");
  itemImages["loaf"] = loadImage("./images/bakery_items/loaf.png");
  itemImages["book"] = loadImage("./images/books_items/book.png");

  for (const upgradeType of Object.keys(bakeryUpgradeImages)) {
    for (const imgName of Object.keys(bakeryUpgradeImages[upgradeType])) {
      console.log(imgName);
      bakeryUpgradeImages[upgradeType][imgName] = loadImage(
        `./images/bakery/upgrades/${upgradeType}/${imgName}.PNG`
      );
    }
  }
}

function setup() {
  angleMode(DEGREES);
  createCanvas(canvasWidth, canvasHeight);

  background(backgroundColor);
}

function draw() {
  background(backgroundColor);

  noStroke();
  const y = canvasHeight / 2 + 100;

  drawBookShop(20, y, 2, ["light"], {});
  drawBookShop(300, y, 2, ["light", "decor"], { book: 5 });

  // drawBakery(500, y, 3, ["light", "decor"], {
  //   cookie: 5,
  //   cake: 5,
  //   croissant: 3,
  //   loaf: 5,
  //   pie: 1,
  //   bread: 3,
  // });
  push();

  addTexture();
}

function addTexture() {
  push();
  addFlecks();
  imageMode(CORNER);

  blendMode(MULTIPLY);
  tint(255, 100);
  image(speckleTexture, 0, 0, canvasWidth, canvasHeight);

  blendMode(SOFT_LIGHT);
  tint(195, 124, 93, 80); // reddish
  image(texture, 0, 0, canvasWidth, canvasHeight);
  pop();
}

function addFlecks() {
  push();
  angleMode(DEGREES);
  strokeWeight(0.3);
  stroke("white");
  const fleckLength = 5;
  const noiseZoom = 0.1;
  const fleckSpeed = 0.001;
  const numFlecks = 100;
  const cols = numFlecks / 2;
  const colSize = canvasWidth / cols;
  const rows = numFlecks / 2;
  const rowSize = canvasHeight / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * colSize;
      let y = j * rowSize;
      const n = noise(x * noiseZoom, y * noiseZoom, frameCount * fleckSpeed);
      x += (n - 0.5) * canvasWidth;
      y += (n - 0.5) * canvasHeight;
      const angle = 360 * n;
      push();
      translate(x, y);
      rotate(angle);
      line(0, 0, fleckLength * n, 0);
      pop();
    }
  }
  pop();
}

function drawBookShop(x, y, level, upgrades, inventory) {
  let shopWidth, shopHeight, shopLength;
  if (upgrades.length === 0) {
    [shopWidth, shopHeight, shopLength] = [150, 180, 40];
  } else if (upgrades.length === 1) {
    [shopWidth, shopHeight, shopLength] = [180, 200, 60];
  } else {
    [shopWidth, shopHeight, shopLength] = [220, 220, 80];
  }
  const shelves = bookShop(x, y, shopWidth, shopHeight, shopLength);
  drawInventory(shelves, inventory);
}
function bookShop(x, y, shopWidth, shopHeight, shopLength) {
  const stairHeight = 40;
  const stairDepth = 20;
  const sideWidth = shopWidth / 2;
  const sideHeight = shopHeight - stairHeight - 50;
  const sideDepth = 40;

  drawBox(x, y, shopWidth, shopHeight, shopLength);

  const shelves = drawShelves(
    x + sideWidth + 20,
    y - sideHeight / 2 - 10,
    6,
    1,
    5,
    shopWidth - sideWidth - 30,
    sideHeight + stairHeight / 2,
    10,
    modes.bottomCorner
  );

  drawBoxInset(x + 10, y - stairHeight, sideWidth, sideHeight, sideDepth, modes.bottomCorner);
  drawBox(x + 10 + sideWidth, y, sideWidth, stairHeight / 2, stairDepth, modes.backCorner);
  drawBox(
    x + 10 + sideWidth,
    y - stairHeight / 2,
    sideWidth,
    stairHeight / 2,
    stairDepth / 2,
    modes.backCorner
  );

  fill(shelfColors.back);
  text("B  O  O  K  S", x + shopWidth / 2 - 30, y - shopHeight + 25);
  return shelves;
}

function drawBakery(x, y, level, upgrades, inventory) {
  console.log(upgrades.length);
  let shopWidth, shopHeight, shopLength;
  if (upgrades.length === 0) {
    [shopWidth, shopHeight, shopLength] = [150, 180, 40];
  } else if (upgrades.length === 1) {
    [shopWidth, shopHeight, shopLength] = [180, 200, 60];
    console.log("why");
  } else {
    [shopWidth, shopHeight, shopLength] = [220, 220, 80];
    console.log("HERE");
  }
  //   NEW UPGRADE

  drawBox(x, y, shopWidth, shopHeight, shopLength);

  const shelves = drawBakeryFront(x, y, shopWidth, shopHeight);
  drawInventory(shelves, inventory);

  //   NEW UPGRADE
  const decorImgSize = shopWidth * 1.5;
  const upgradeY = y - shopHeight - shopLength;
  if (upgrades.includes("decor")) {
    for (const [name, img] of Object.entries(bakeryUpgradeImages.decor)) {
      if (name !== "roof" && name !== "menu") {
        image(img, x, upgradeY, decorImgSize, decorImgSize);
      }
    }
    image(
      bakeryUpgradeImages.decor.roof,
      x,
      y - shopHeight - shopLength - 10,
      decorImgSize,
      decorImgSize
    );
    image(
      bakeryUpgradeImages.decor.menu,
      x - 20,
      y - (shopHeight * 3) / 2 + 25,
      decorImgSize,
      decorImgSize
    );
  }

  if (upgrades.includes("light")) {
    image(bakeryUpgradeImages.light.sign, x, upgradeY - 30, decorImgSize, decorImgSize);
    if ((frameCount * 0.1) % 4 < 2) {
      push();
      blendMode(DODGE);
      image(bakeryUpgradeImages.light.signLight, x, upgradeY - 30, decorImgSize, decorImgSize);
      pop();
    }
  }
}

function drawInventory(shelves, inventory) {
  const emptyShelves = shelves;
  const nonEmptyShelves = [];

  for (const [item, amount] of Object.entries(inventory)) {
    let existingShelf = false;
    for (const shelf of nonEmptyShelves) {
      if (shelf.item === item) {
        existingShelf = true;
      }
    }
    if (!existingShelf) {
      if (emptyShelves.length < 1) {
        console.log("no space");
        return;
      } else {
        const shelf = emptyShelves[0];
        emptyShelves.shift();
        nonEmptyShelves.push(shelf);
        shelf.item = item;
        shelf.amount = amount;
        const overlap = shelf.w / amount;
        for (let i = 0; i < amount; i++) {
          ellipse(shelf.x, shelf.y, 2, 2);
          imageMode(CORNER);
          push();

          const imgWidth = (shelf.h * itemImages[item].width) / itemImages[item].height;
          image(itemImages[item], shelf.x + i * overlap, shelf.y, imgWidth, shelf.h);
          pop();
        }
      }
    }
  }
}

function drawBakeryFront(x, y, shopWidth, shopHeight) {
  const windowWidth = shopWidth / 2 + 20;
  const windowHeight = shopHeight / 3;

  drawBox(x + windowWidth + 10, y, windowWidth, 20, 20, modes.backCorner);

  const shelves = drawShelves(x + 10, y - 30, 2, 2, 5, windowWidth, 50, 10);
  drawWindow(x + 10, y - 40 - 50, windowWidth, windowHeight, 40, modes.bottomCorner);

  const shelves2 = drawShelves(
    x + windowWidth + 20,
    y - (windowHeight + 60) / 2,
    4,
    1,
    5,
    shopWidth - windowWidth - 30,
    windowHeight + 60,
    10
  );

  const allShelves = [...shelves, ...shelves2];

  fill(shelfColors.back);
  text("B  A  K  E  R  Y", x + shopWidth / 2 - 40, y - shopHeight + 25);
  return allShelves;
}

function drawShelves(x, y, nRows, nCols, gap, shelfWidth, shelfHeight, shelfLength) {
  const shelvesInfo = [];

  push();
  const w = (shelfWidth - (nCols - 1) * gap) / nCols;
  const h = (shelfHeight - (nRows - 1) * gap) / nRows;
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nCols; j++) {
      const shelfInfo = {
        x: x + j * (w + gap) + shelfLength / 2,
        y: y + i * (h + gap) - shelfHeight / 2 - shelfLength - 10,
        w: w - shelfLength * 2,
        h: h - shelfLength,
        item: "",
        amount: 0,
      };

      drawBoxInset(
        x + j * (w + gap),
        y + i * (h + gap) - shelfHeight / 2,
        w,
        h,
        shelfLength,
        modes.bottomCorner
      );
      shelvesInfo.push(shelfInfo);
    }
  }
  pop();
  return shelvesInfo;
}

function drawBox(x, y, boxWidth, boxHeight, boxLength, mode = modes.bottomCorner) {
  push();
  if (mode === modes.bottomMiddle) {
    translate(-boxWidth / 2, 0);
  } else if (mode === modes.center) {
    translate(-boxWidth / 2, boxHeight / 2);
  } else if (mode === modes.topCorner) {
    translate(-boxWidth, boxHeight);
  } else if (mode === modes.bottomCorner) {
    translate(0, 0);
  } else if (mode === modes.backCorner) {
    translate(-boxWidth - boxLength * cos(angle), -boxLength * sin(angle) + boxLength);
  }
  drawFace(x, y - boxHeight, boxWidth, boxHeight, faceType.front);
  drawFace(x + boxWidth, y - boxHeight, boxLength, boxHeight, faceType.side);
  drawFace(x, y - boxHeight, boxWidth, boxLength, faceType.top);

  pop();

  if (drawPlacementDot) {
    fill("black");
    ellipse(x, y, 5, 5);
  }
}

function drawBoxInset(x, y, boxWidth, boxHeight, boxLength, mode = modes.bottomCorner) {
  push();
  if (mode === modes.bottomMiddle) {
    translate(-boxWidth / 2, 0);
  } else if (mode === modes.center) {
    translate(-boxWidth / 2, boxHeight / 2);
  } else if (mode === modes.topCorner) {
    translate(-boxWidth, boxHeight);
  } else if (mode === modes.bottomCorner) {
    translate(0, 0);
  } else if (mode === modes.backCorner) {
    translate(-boxWidth - boxLength * cos(angle), boxHeight * sin(angle));
  }

  drawFace(x, y - boxHeight, boxWidth, boxHeight, faceType.backInner);
  drawFace(x, y - boxHeight, boxLength, boxHeight, faceType.sideInner);
  drawFace(x, y, boxWidth, boxLength, faceType.bottomInner);

  pop();

  if (drawPlacementDot) {
    fill("black");
    ellipse(x, y, 5, 5);
  }
}

function drawWindow(x, y, boxWidth, boxHeight, boxLength, mode = modes.bottomCorner) {
  push();
  if (mode === modes.bottomMiddle) {
    translate(-boxWidth / 2, 0);
  } else if (mode === modes.center) {
    translate(-boxWidth / 2, boxHeight / 2);
  } else if (mode === modes.topCorner) {
    translate(-boxWidth, boxHeight);
  } else if (mode === modes.bottomCorner) {
    translate(0, 0);
  } else if (mode === modes.backCorner) {
    translate(-boxWidth - boxLength * cos(angle), boxHeight * sin(angle));
  }

  drawFace(x, y - boxHeight, boxLength, boxHeight, faceType.sideInner);
  drawFace(x, y, boxWidth, boxLength, faceType.bottomInner);

  blendMode(DODGE);
  stroke("white");
  fill([255, 237, 172, 100]);
  rect(x, y - boxHeight, boxWidth, boxHeight);

  pop();
  if (drawPlacementDot) {
    fill("black");
    ellipse(x, y, 5, 5);
  }
}

function drawFace(x, y, w, h, face) {
  beginShape();
  if (faceType.front === face) {
    fill(wallColors.front);
    vertex(x, y);
    vertex(x, y + h);
    vertex(x + w, y + h);
    vertex(x + w, y);
  } else if (faceType.side === face) {
    fill(wallColors.side);
    const dx = cos(angle) * w;
    const dy = sin(angle) * w;
    vertex(x, y);
    vertex(x + dx, y - dy);
    vertex(x + dx, y + h - dy);
    vertex(x, y + h);
  } else if (faceType.top === face) {
    fill(wallColors.top);
    const dx = cos(angle) * h;
    const dy = sin(angle) * h;

    vertex(x, y);
    vertex(x + dx, y - dy);
    vertex(x + dx + w, y - dy);
    vertex(x + w, y);
  } else if (faceType.bottomInner === face) {
    fill(shelfColors.bottom);
    const dx = cos(angle) * h;
    const dy = sin(angle) * h;

    vertex(x, y);
    vertex(x + dx, y - dy);
    vertex(x + w, y - dy);
    vertex(x + w, y);
  } else if (faceType.sideInner === face) {
    fill(shelfColors.side);
    const dx = cos(angle) * w;
    const dy = sin(angle) * w;
    vertex(x, y);
    vertex(x + dx, y);
    vertex(x + dx, y + h - dy);
    vertex(x, y + h);
  } else if (faceType.backInner === face) {
    fill(shelfColors.back);
    vertex(x, y);
    vertex(x, y + h);
    vertex(x + w, y + h);
    vertex(x + w, y);
  } else if (faceType.backLight === face) {
    fill(wallColors.inside);
    vertex(x, y);
    vertex(x, y + h);
    vertex(x + w, y + h);
    vertex(x + w, y);
  }
  endShape(CLOSE);
}
