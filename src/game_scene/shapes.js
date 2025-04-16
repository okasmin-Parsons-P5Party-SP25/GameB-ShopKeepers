import {modes, angle, faceType, wallColors, draw_placement_dot, shelfColor,item_images} from '../utilities.js'

export function drawInventory(shelves, inventory){
    let empty_shelfs = shelves
    let nonempty_shelfs = []

    for(let [item, amount] of Object.entries(inventory)){
        let existing_shelf = false
        for(let shelf of nonempty_shelfs){
            if(shelf.item == item){
                existing_shelf = true
            }
        }
        if(existing_shelf == false){
            if(empty_shelfs <1){
                console.log("no space")
                return
            }else{
                let shelf = empty_shelfs[0]
                empty_shelfs.shift()
                nonempty_shelfs.push(shelf)
                shelf.item = item
                shelf.amount = amount
                let overlap = shelf.w/amount
                for(let i=0;i<amount;i++){
                    ellipse(shelf.x, shelf.y,2,2)
                    imageMode(CORNER)
                    push()
                    
                    let img_w = shelf.h*item_images[item].width/item_images[item].height
                    image(item_images[item], (shelf.x)+i*overlap, shelf.y, img_w, shelf.h)
                    pop()
                }
            }

        }
    }

}



export function drawShelves(x,y, nRows, nCols, gap, shelf_w, shelf_h, shelf_l){
    let shelves_info = []

    push()
    // translate(0,-shelf_h/2)  
    let w = (shelf_w- (nCols-1)*gap)/nCols
    let h = (shelf_h - (nRows-1)*gap)/nRows
    for(let i=0;i<nRows;i++){
        for(let j = 0; j<nCols; j++){
            let shelf_info = {
                x:x+j*(w+gap) + shelf_l/2,
                y: y+i*(h+gap)-shelf_h/2 - shelf_l - 10,
                w:w-shelf_l*2,
                h:h-shelf_l,
                item:"",
                amount:0
            }

             drawBoxInset(
                x+j*(w+gap),
                y+i*(h+gap)-shelf_h/2,
                w,
                h,
                shelf_l,
                modes.BOTTOM_CORNER)
            shelves_info.push(shelf_info)
        }

    }
    pop()
    return shelves_info

}


export function drawBox(x,y,box_w, box_h, box_l, mode=modes.BOTTOM_CORNER){
    push()
    if(mode ==modes.BOTTOM_MIDDLE){
       translate(-box_w/2,0) 
    }else if(mode == modes.CENTER){
        translate(-box_w/2,box_h/2) 
    }else if(mode == modes.TOP_CORNER){
        translate(-box_w,box_h) 
    }else if(mode == modes.BOTTOM_CORNER){
        translate(0,0) 
    }else if(mode==modes.BACK_CORNER){
        translate(-box_w -box_l*cos(angle),-box_l*sin(angle) + box_l) 
    }
    drawFace(x,y-box_h,box_w,box_h,faceType.FRONT)
    drawFace(x+box_w,y-box_h,box_l,box_h,faceType.SIDE)
    drawFace(x,y-box_h,box_w,box_l,faceType.TOP)

    pop()
    
    //mark the position
    if(draw_placement_dot){
        fill("black")
        ellipse(x,y,5,5)
    }
    
}

export function drawBoxInset(x, y, box_w, box_h, box_l, mode = modes.BOTTOM_CORNER) {
    push();
    if (mode == modes.BOTTOM_MIDDLE) {
        translate(-box_w / 2, 0);
    } else if (mode == modes.CENTER) {
        translate(-box_w / 2, box_h / 2);
    } else if (mode == modes.TOP_CORNER) {
        translate(-box_w, box_h);
    } else if (mode == modes.BOTTOM_CORNER) {
        translate(0, 0);
    } else if (mode == modes.BACK_CORNER) {
        translate(-box_w - box_l * cos(angle), box_h * sin(angle));
    }

    drawFace(x,y-box_h,box_w,box_h,faceType.BACK_INNER)
    drawFace(x,y-box_h,box_l,box_h,faceType.SIDE_INNER)
    drawFace(x,y,box_w,box_l,faceType.BOTTOM_INNER)

    pop();

   if(draw_placement_dot){
        fill("black")
        ellipse(x,y,5,5)
    }
}

export function drawWindow(x, y, box_w, box_h, box_l, mode = modes.BOTTOM_CORNER) {
    push();
    if (mode == modes.BOTTOM_MIDDLE) {
        translate(-box_w / 2, 0);
    } else if (mode == modes.CENTER) {
        translate(-box_w / 2, box_h / 2);
    } else if (mode == modes.TOP_CORNER) {
        translate(-box_w, box_h);
    } else if (mode == modes.BOTTOM_CORNER) {
        translate(0, 0);
    } else if (mode == modes.BACK_CORNER) {
        translate(-box_w - box_l * cos(angle), box_h * sin(angle));
    }

    // drawFace(x,y-box_h,box_w,box_h,faceType.BACK_LIGHT)
    drawFace(x,y-box_h,box_l,box_h,faceType.SIDE_INNER)
    drawFace(x,y,box_w,box_l,faceType.BOTTOM_INNER)

    blendMode(DODGE)
    stroke('white')
    fill([255,237,172,100])
    rect(x,y-box_h, box_w, box_h)

    pop();
   if(draw_placement_dot){
        fill("black")
        ellipse(x,y,5,5)
    }
}

export function drawFace(x,y,w,h,face){
    beginShape()
    if(faceType.FRONT ==face){
        fill(wallColors.front)
        vertex(x,y)
        vertex(x,y+h)
        vertex(x+w,y+h)
        vertex(x+w,y)
    }else if(faceType.SIDE == face){
        fill(wallColors.side)
        let dx = cos(angle)* w;
        let dy = sin(angle)*w
        vertex(x, y);
        vertex(x +dx, y - dy);
        vertex(x +dx, y + h - dy);
        vertex(x, y+ h);
            
    }else if(faceType.TOP == face){
        fill(wallColors.top)
        let dx = cos(angle) * h;
        let dy = sin(angle) * h;

        vertex(x, y);
        vertex(x + dx, y - dy);
        vertex(x + dx + w, y - dy);
        vertex(x + w, y);
        

    }else if(faceType.BOTTOM_INNER == face){
        fill(shelfColor.bottom)
        let dx = cos(angle) * h;
        let dy = sin(angle) * h;

        vertex(x, y);
        vertex(x + dx, y - dy);
        vertex(x + w, y - dy);
        vertex(x + w, y);
    }else if(faceType.SIDE_INNER == face){
        fill(shelfColor.side)
        let dx = cos(angle)* w;
        let dy = sin(angle)*w
        vertex(x, y);
        vertex(x +dx, y );
        vertex(x +dx, y + h - dy);
        vertex(x, y+ h);
    }else if(faceType.BACK_INNER == face){
        fill(shelfColor.back)
        vertex(x,y)
        vertex(x,y+h)
        vertex(x+w,y+h)
        vertex(x+w,y)
    }else if(faceType.BACK_LIGHT == face){
        fill(wallColors.inside)
        vertex(x,y)
        vertex(x,y+h)
        vertex(x+w,y+h)
        vertex(x+w,y)
    }
    endShape(CLOSE)
}
 