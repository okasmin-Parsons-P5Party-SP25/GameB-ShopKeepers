
const width = 700
const height = 500
const bgColor = "#FBF9F4"

const dudes = []

function setup(){
    createCanvas(width,height)
    background(bgColor)
    angleMode(RADIANS)
    noStroke()
    for(i=0;i<10;i++){
        let speed = random()
        let y = random()*height/2+height/4
        let dude = new Dude(0,y,width/2, y + 20,speed +.1)
        dudes.push(dude)
    }
}

function draw(){
    background(bgColor)
    for(let dude of dudes){
        dude.update()
    }
}


class Dude{
    constructor(x,y, xEnd, yEnd, speed,items = []){
        this.x = x
        this.y = y
        this.xEnd = xEnd
        this.yEnd = yEnd
        this.speed = speed
        this.vx = speed
        this.vy = 0
        this.items = items
        this.type = random([1,2,3])
        this.alive = true
    }

    update(){
        if(this.alive){
            this.move()
            this.checkEnd()
            this.draw()
        }
        
    }

    checkEnd(){
        if(this.x >= width-10){
            this.alive = false
        }
        else if(dist(this.x,this.y, this.xEnd, this.yEnd)<10){
            this.xEnd = width
            this.items.push('item')
        }
        
    }

    move(){
        let dx = this.xEnd - this.x;
        let dy = this.yEnd - this.y;
        let nZoom = 3
        let n =  noise(nZoom*this.x,nZoom*this.y)*2*PI*.1

        let angle = Math.atan2(dy, dx);

        this.vx = cos(angle + n)
        this.vy = sin(angle +n)
        
        this.x +=this.vx*this.speed
        this.y +=this.vy*this.speed
    }

    draw(){
        if(this.type ==1){
            fill('black')
        }else if(this.type ==2){
            fill('grey')
        }else if(this.type ==3){
            fill('blue')
        }
        rect(this.x,this.y, 5,15)

        for(let item of this.items){
            if(item =='item'){
                fill('red')
                ellipse(this.x ,this.y+ 4, 5,5)
            }
        }
    }
}
