import {
  modes,
  angle,
  faceType,
  wallColors,
  drawPlacementDot,
  shelfColor,
  itemImages,
} from "../utilities.js";

export function drawInventory(shelves, inventory) {
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

          const imgW = (shelf.h * itemImages[item].width) / itemImages[item].height;
          image(itemImages[item], shelf.x + i * overlap, shelf.y, imgW, shelf.h);
          pop();
        }
      }
    }
  }
}

export function drawShelves(x, y, nRows, nCols, gap, shelfW, shelfH, shelfL) {
  const shelvesInfo = [];

  push();
  const w = (shelfW - (nCols - 1) * gap) / nCols;
  const h = (shelfH - (nRows - 1) * gap) / nRows;
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nCols; j++) {
      const shelfInfo = {
        x: x + j * (w + gap) + shelfL / 2,
        y: y + i * (h + gap) - shelfH / 2 - shelfL - 5,
        w: w - shelfL * 2,
        h: h - shelfL,
        item: "",
        amount: 0,
      };

      drawBoxInset(
        x + j * (w + gap),
        y + i * (h + gap) - shelfH / 2,
        w,
        h,
        shelfL,
        modes.BOTTOM_CORNER
      );
      shelvesInfo.push(shelfInfo);
    }
  }
  pop();
  return shelvesInfo;
}

export function drawBox(x, y, boxW, boxH, boxL, mode = modes.BOTTOM_CORNER) {
  push();
  if (mode === modes.BOTTOM_MIDDLE) {
    translate(-boxW / 2, 0);
  } else if (mode === modes.CENTER) {
    translate(-boxW / 2, boxH / 2);
  } else if (mode === modes.TOP_CORNER) {
    translate(-boxW, boxH);
  } else if (mode === modes.BOTTOM_CORNER) {
    translate(0, 0);
  } else if (mode === modes.BACK_CORNER) {
    translate(-boxW - boxL * cos(angle), -boxL * sin(angle) + boxL);
  }
  drawFace(x, y - boxH, boxW, boxH, faceType.FRONT);
  drawFace(x + boxW, y - boxH, boxL, boxH, faceType.SIDE);
  drawFace(x, y - boxH, boxW, boxL, faceType.TOP);

  pop();

  if (drawPlacementDot) {
    fill("black");
    ellipse(x, y, 5, 5);
  }
}

export function drawBoxInset(x, y, boxW, boxH, boxL, mode = modes.BOTTOM_CORNER) {
  push();
  if (mode === modes.BOTTOM_MIDDLE) {
    translate(-boxW / 2, 0);
  } else if (mode === modes.CENTER) {
    translate(-boxW / 2, boxH / 2);
  } else if (mode === modes.TOP_CORNER) {
    translate(-boxW, boxH);
  } else if (mode === modes.BOTTOM_CORNER) {
    translate(0, 0);
  } else if (mode === modes.BACK_CORNER) {
    translate(-boxW - boxL * cos(angle), boxH * sin(angle));
  }

  drawFace(x, y - boxH, boxW, boxH, faceType.BACK_INNER);
  drawFace(x, y - boxH, boxL, boxH, faceType.SIDE_INNER);
  drawFace(x, y, boxW, boxL, faceType.BOTTOM_INNER);

  pop();

  if (drawPlacementDot) {
    fill("black");
    ellipse(x, y, 5, 5);
  }
}

export function drawWindow(x, y, boxW, boxH, boxL, mode = modes.BOTTOM_CORNER) {
  push();
  if (mode === modes.BOTTOM_MIDDLE) {
    translate(-boxW / 2, 0);
  } else if (mode === modes.CENTER) {
    translate(-boxW / 2, boxH / 2);
  } else if (mode === modes.TOP_CORNER) {
    translate(-boxW, boxH);
  } else if (mode === modes.BOTTOM_CORNER) {
    translate(0, 0);
  } else if (mode === modes.BACK_CORNER) {
    translate(-boxW - boxL * cos(angle), boxH * sin(angle));
  }

  drawFace(x, y - boxH, boxL, boxH, faceType.SIDE_INNER);
  drawFace(x, y, boxW, boxL, faceType.BOTTOM_INNER);

  blendMode(DODGE);
  stroke("white");
  fill([255, 237, 172, 100]);
  rect(x, y - boxH, boxW, boxH);

  pop();
  if (drawPlacementDot) {
    fill("black");
    ellipse(x, y, 5, 5);
  }
}

export function drawFace(x, y, w, h, face) {
  beginShape();
  if (faceType.FRONT === face) {
    fill(wallColors.front);
    vertex(x, y);
    vertex(x, y + h);
    vertex(x + w, y + h);
    vertex(x + w, y);
  } else if (faceType.SIDE === face) {
    fill(wallColors.side);
    const dx = cos(angle) * w;
    const dy = sin(angle) * w;
    vertex(x, y);
    vertex(x + dx, y - dy);
    vertex(x + dx, y + h - dy);
    vertex(x, y + h);
  } else if (faceType.TOP === face) {
    fill(wallColors.top);
    const dx = cos(angle) * h;
    const dy = sin(angle) * h;

    vertex(x, y);
    vertex(x + dx, y - dy);
    vertex(x + dx + w, y - dy);
    vertex(x + w, y);
  } else if (faceType.BOTTOM_INNER === face) {
    fill(shelfColor.bottom);
    const dx = cos(angle) * h;
    const dy = sin(angle) * h;

    vertex(x, y);
    vertex(x + dx, y - dy);
    vertex(x + w, y - dy);
    vertex(x + w, y);
  } else if (faceType.SIDE_INNER === face) {
    fill(shelfColor.side);
    const dx = cos(angle) * w;
    const dy = sin(angle) * w;
    vertex(x, y);
    vertex(x + dx, y);
    vertex(x + dx, y + h - dy);
    vertex(x, y + h);
  } else if (faceType.BACK_INNER === face) {
    fill(shelfColor.back);
    vertex(x, y);
    vertex(x, y + h);
    vertex(x + w, y + h);
    vertex(x + w, y);
  } else if (faceType.BACK_LIGHT === face) {
    fill(wallColors.inside);
    vertex(x, y);
    vertex(x, y + h);
    vertex(x + w, y + h);
    vertex(x + w, y);
  }
  endShape(CLOSE);
}
