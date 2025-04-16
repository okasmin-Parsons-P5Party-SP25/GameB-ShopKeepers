
const width = 800
const height = 600
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
    BACK_INNER:6,
    BACK_LIGHT:7

}

const angle = 40

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
    bottom_light:"#ECE1CF",
}

let textureImg;
let speckle_texture;
let item_images = {}

function preload(){
    texture = loadImage('./images/textures/white-paper-texture.jpg')
    // texture = loadImage('./images/textures/white-gypsum-wall.jpg')
    speckle_texture = loadImage('./images/textures/cardboard-texture.jpg')
    item_images['cookie'] = loadImage('./images/bakery_items/cookie.png')
    item_images['cake'] = loadImage('./images/bakery_items/cake.png')
    item_images['bread'] = loadImage('./images/bakery_items/bread1.png')
    item_images['croissant'] = loadImage('./images/bakery_items/croissant.png')
    item_images['pie'] = loadImage('./images/bakery_items/pie.png')
    item_images['loaf'] = loadImage('./images/bakery_items/loaf.png')
}

function setup(){
    
    angleMode(DEGREES)
    createCanvas(width,height)
    
    background(bgColor)
   
    noStroke()
    drawBookShop(width/2 - 150,300, 150,250,100)
    drawBakery(width/2 +50,300, 200,200,80)

    addTexture()

}



function draw(){
      
    background(bgColor)
   
    noStroke()
    let y = height/2+100
   
    drawBakery(20,y ,level = 1, upgrades = {}, inventory = {'cookie':5, 'cake':2, 'croissant': 3})
    drawBakery(230,y,level = 2, upgrades = {}, inventory = {'bread':4, 'pie':2})
    drawBakery(500,y,level = 3, upgrades = {}, inventory = {'cookie':5, 'cake':5, 'croissant': 3,'loaf':5, 'pie':1,'bread':3})
    // image(item,width/2 +5, 300,20,20)

    addTexture()

}

function addTexture(){
    push()
    addFlecks()
    imageMode(CORNER)

    blendMode(MULTIPLY)
    tint(255,100)
    image(speckle_texture,0,0,width, height)
    
    blendMode(SOFT_LIGHT)
    tint(195, 124, 93, [80]);//redish
    image(texture,0,0,width, height)
    pop()
}

function addFlecks(){
    push()
    angleMode(DEGREES)
    strokeWeight(.3)
    stroke('white')
    let fleckLen = 5
    let nZoom = .1
    let fleckSpeed = .001
    const numFlecks = 100
    let cols =numFlecks/2
    let col_size = width/cols
    let rows = numFlecks/2
    let row_size = height/rows
    for(let i=0;i<cols;i++){
       for(let j=0;j<rows;j++){
            //draw flek
            let x=i*col_size 
            let y = j*row_size
            let n = noise(x*nZoom,y*nZoom, frameCount*fleckSpeed)
            x+= (n-.5)*width
            y+= (n-.5)*height
            let angle = 360*(n)
            push()
            translate(x,y)
            rotate(angle)
            line(0,0,fleckLen*n,0)
            pop()
       }
    }
    pop()
}

function drawBookShop(x,y, shop_w, shop_h, shop_l){
    const stair_height = 40
    const stair_depth = 20
    const side_w = shop_w/2
    const side_h = shop_h-stair_height-50
    const side_d = 40
  
    //base
    drawBox(x,y,shop_w, shop_h,shop_l) 
    // drawBox(x+window_w+10,y,window_w, 20,20, modes.BACK_CORNER)

    // //below window shelves
    // drawShelves(x+ 10,y-30, nRows=2,nCols=3, gap=5, shelf_w=window_w,shelf_h=50, shelf_l=10 )
   

    // //side shelves
    drawShelves(x+ side_w + 20,y -side_h/2 , nRows=6,nCols=1, gap=5, shelf_w=shop_w-side_w-30,shelf_h=side_h +stair_height/2, shelf_l=10 , modes.BOTTOM_CORNER)
   
    drawBoxInset(x+10,y-stair_height,side_w, side_h,side_d, modes.BOTTOM_CORNER)
    drawBox(x+10+side_w,y,side_w, stair_height/2,stair_depth, modes.BACK_CORNER)
    drawBox(x+10+side_w,y-stair_height/2,side_w, stair_height/2,stair_depth/2, modes.BACK_CORNER)
    // //text
    fill(shelfColor.back)
    text("B  O  O  K  S", x+shop_w/2-30,y-shop_h + 25) 
}

function drawBakery(x,y, level, upgrades,inventory){
    let shop_w, shop_h, shop_l;
    if(level ==1){  
        [shop_w, shop_h, shop_l] = [150,180,40]   
    }else if(level ==2){
        [shop_w, shop_h, shop_l] = [180,200,60]
    }else{
        [shop_w, shop_h, shop_l] = [200,220,80]
    }

    //draw the back
    drawBox(x,y,shop_w, shop_h,shop_l) 

    //draw middle elements
    fill("red")
    // rect(x+50,y-120, 20,20)

    //draw the front
    let shelves = drawBakeryFront(x,y, shop_w, shop_h)

    //draw inventory 
    drawInventory(shelves, inventory)
}

function drawInventory(shelves, inventory){
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

function drawBakeryFront(x,y, shop_w, shop_h){
    const window_w = shop_w/2+20
    const window_h = shop_h/3
    //base
    // drawBox(x,y,shop_w, shop_h,shop_l) 
    drawBox(x+window_w+10,y,window_w, 20,20, modes.BACK_CORNER)

    //below window shelves
    let shelves = drawShelves(x+ 10,y-30, nRows=2,nCols=2, gap=5, shelf_w=window_w,shelf_h=50, shelf_l=10 )
    drawWindow(x+10,y-40-50,window_w, window_h,40, modes.BOTTOM_CORNER)

    //side shelves
    let shelves2= drawShelves(x+ window_w + 20,y-(window_h + 60)/2, nRows=4,nCols=1, gap=5, shelf_w=shop_w-window_w-30,shelf_h=window_h + 60, shelf_l=10  )

    shelves = [...shelves,...shelves2]
    //text
    fill(shelfColor.back)
    text("B  A  K  E  R  Y", x+shop_w/2-40,y-shop_h + 25) 
    return shelves
}

function drawShelves(x,y, nRows, nCols, gap, shelf_w, shelf_h, shelf_l){
    let shelves_info = []

    push()
    // translate(0,-shelf_h/2)  
    let w = (shelf_w- (nCols-1)*gap)/nCols
    let h = (shelf_h - (nRows-1)*gap)/nRows
    for(let i=0;i<nRows;i++){
        for(j = 0; j<nCols; j++){
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

function drawWindow(x, y, box_w, box_h, box_l, mode = modes.BOTTOM_CORNER) {
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
    }else if(faceType.BACK_LIGHT == face){
        fill(wallColors.inside)
        vertex(x,y)
        vertex(x,y+h)
        vertex(x+w,y+h)
        vertex(x+w,y)
    }
    endShape(CLOSE)
}
 