
import {drawBakery} from './bakery.js'
export function drawShop(x,y,type, level, upgrades, inventory){
    drawBakery(x,y,level = level, upgrades = upgrades, inventory = inventory)
}

export function addTexture(speckle_texture, textureImg){
    push()
    addFlecks()
    imageMode(CORNER)

    blendMode(MULTIPLY)
    tint(255,100)
    image(speckle_texture,0,0,width, height)
    
    blendMode(SOFT_LIGHT)
    tint(195, 124, 93, 80);//redish
    image(textureImg,0,0,width, height)
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