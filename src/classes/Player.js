import { polarToCart } from '../Math'
import '../p5'
export default class Player{
  /*
    r = distance from center
    s = player's size (radius)
  */
  constructor(r,s, enemies){
    this.r = r
    this.s = s
    this.angle = 0

    this.x = 0
      this.dx = .03
      this.maxDX = 0.04
    this.y = 0
      this.dy = 0
    this.speed = .025
    this.color = [255,255,255]

    this.isAlive = true
    this.enemies = enemies

    window.addEventListener('keydown', (e) => {
      switch(e.keyCode){
        case 37: this.move(-1,0);break; // Left Arrow
        case 39: this.move(1,0);break; // Right Arrow
        case 38: this.move(0,-1);break; // Up Arrow (Y = 0 in on top 😅)
        case 40: this.move(0,1);break; // Down Arrow
      }
    })
  }

  didTouch(){
    let res = false
    this.enemies.forEach(enemy => {
      enemy.projs.forEach(proj => {
        const distance = dist(this.x, this.y, proj.x, proj.y)
        if(distance <= this.s / 2 + proj.size / 2){
          res = true
        }
      })
    })
    return res
  }

  move(fX, fY){
    if(this.isAlive){
      //Updating acceleration based on applied force
      this.dx += this.speed * fX // Angle
      this.dy += this.speed * fY * 100 // Radius = distance from center
      
      // Checking max speed (X)
      if(this.dx > this.maxDX || this.dx < -this.maxDX) {
        this.dx = this.maxDX * Math.sign(this.dx)
      }
      
    }
  }

  update(){
    if(this.isAlive){
      this.isAlive = !this.didTouch()
      this.angle += this.dx
      if(this.r < width / 2){
        this.r += this.dy
      } else{
        this.r = width / 2 - .001
        this.dy = 0
      }
      this.dy /= 1.3
      // polarToCart => {x:number, y:number}
      let {x,y} = polarToCart(this.r, this.angle)
      this.x = x
      this.y = y
    }
    else{
      this.color = [255,0,0]
    }
  }

  draw(){
    const [r, g, b] = this.color
    fill(r,g,b)
    ellipse(this.x, this.y, this.s, this.s)
  }
}