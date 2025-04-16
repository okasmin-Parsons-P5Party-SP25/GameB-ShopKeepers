
import {modes, angle, faceType, wallColors, shelfColor} from '../utilities.js'
import { drawInventory, drawShelves, drawBox,drawBoxInset,drawWindow,drawFace} from './shapes.js';

export function drawBakery(x,y, level, upgrades, inventory) {
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

function drawBakeryFront(x,y, shop_w, shop_h){
    const window_w = shop_w/2+20
    const window_h = shop_h/3
    //base
    // drawBox(x,y,shop_w, shop_h,shop_l) 
    drawBox(x+window_w+10,y,window_w, 20,20, modes.BACK_CORNER)

    //below window shelves
    let shelves = drawShelves(x+ 10,y-30, 2,2, 5, window_w,50, 10 )
    drawWindow(x+10,y-40-50,window_w, window_h,40, modes.BOTTOM_CORNER)

    //side shelves
    let shelves2= drawShelves(x+ window_w + 20,y-(window_h + 60)/2, 4,1, 5, shop_w-window_w-30,window_h + 60, 10  )

    shelves = [...shelves,...shelves2]
    //text
    fill(shelfColor.back)
    text("B  A  K  E  R  Y", x+shop_w/2-40,y-shop_h + 25) 
    return shelves
}