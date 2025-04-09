
const width = 700
const height = 500
const bgColor = "#FBF9F4"
const draw_placement_dot = false

const modes = {
    BOTTOM_MIDDLE:1,
    BOTTOM_CORNER:2,
    CENTER:3,
    TOP_CORNER:4,
    BACK_CORNER:5,
}
const faceType = {
    FRONT:1,
    SIDE:2,
    TOP:3,
    BOTTOM_INNER:4,
    SIDE_INNER:5,
    BACK_INNER:6
}

const angle = 30

const wallColors = {
    front:"#F2EBDC",
    side:"#ECE1CF",
    top:"#F5F1E7",
    inside:"#FAF1E1"
}

const shelfColor = {
    back:"#E8D7BB",
    side:"#F1E2CA",
    bottom:"#ECE1CF",
    bottom_light:"#ECE1CF"
}

function setup(){
    angleMode(DEGREES)
    createCanvas(width,height)
    background(bgColor)
    noStroke()

    drawBakery(width/2 - 100,300, 200,200,100)
}
function drawBakery(x,y, shop_w, shop_h, shop_l){
    //base
    drawBox(x,y,shop_w, shop_h,shop_l) 
    drawBox(x+shop_w/2,y,shop_w/2, 20,20, modes.BACK_CORNER)
    drawBoxInset(x+10,y-40-50,shop_w/2+10, shop_h/3,20, modes.BOTTOM_CORNER)
    drawShelves(x+ 10,y-30, nRows=2,nCols=3, gap=5, shelf_w=shop_w-40,shelf_h=50, shelf_l=10 )
}

function drawShelves(x,y, nRows, nCols, gap, shelf_w, shelf_h, shelf_l){
    push()
    translate(0,-shelf_h/2)

    let w = (shelf_w- (nCols-1)*gap)/nCols
    let h = (shelf_h - (nRows-1)*gap)/nRows
    for(let i=0;i<nRows;i++){
        for(j = 0; j<nCols; j++){
             drawBoxInset(
                x+j*(w+gap),
                y+i*(h+gap),
                w,
                h,
                shelf_l,
                modes.BOTTOM_CORNER)
        }
    }
    pop()

}


function drawBox(x,y,box_w, box_h, box_l, mode=modes.BOTTOM_CORNER){
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
        translate(-box_w -box_l*cos(angle),box_h*sin(angle)) 
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

function drawBoxInset(x, y, box_w, box_h, box_l, mode = modes.BOTTOM_CORNER) {
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

function drawFace(x,y,w,h,face){
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
    }
    endShape(CLOSE)
}
 