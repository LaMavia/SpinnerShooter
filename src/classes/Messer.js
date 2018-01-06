import {} from '../Math'
import '../p5'

export default class Messer{
  constructor(size, speed){
    this.x     = 0
    this.dx    = random(-2,2)
    this.y     = 0
    this.dy    = random(-2,2)
    this.size  = size
    this.speed = speed
  }

  update(){ 
    this.dx += noise(this.speed) * random(-1,1)
    this.dy += noise(this.speed) * random(-1,1)
    this.x  += this.dx
    this.y  += this.dy
    
    if(this.x > width || this.x < 0) this.dx *= -1
    if(this.y > height || this.y < 0) this.dy *= -1

    // console.log(this.x, this.y)
  }

  draw(){
    push()

    fill(100,100,255)
    translate(0,0)
    ellipse(this.x, this.y, this.size, this.size)

    pop()
  }
}