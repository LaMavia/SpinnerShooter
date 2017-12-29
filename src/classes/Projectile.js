import { polarToCart } from '../Math'
import uuid from 'uuid'
import '../p5'
export default class Projectile{
  constructor({ x, y }, size, angle, velocity, acceleration, player){
    this.startX = x
    this.startY = y
    this.x = x
    this.y = y
    this.size = size
    this.angle = angle
    this.v = velocity
    this.r = 0
    this.alpha = 255
    this.acc = acceleration
    this.range = 500 // Disapears after reaching that range
    this.arr = []
    this.id = uuid.v4()
  }

  update(){
    this.size -= this.r / 2300
    this.v += this.acc
    this.r += this.v
    let { x, y } = polarToCart(this.r, this.angle)
    this.x = x
    this.y = y

    if(this.r + this.size / 2 > this.range || this.alpha <= 0){
      const i = this.arr.findIndex(it => it.id === this.id)
      this.arr.splice(i,1)
      console.log(this.arr.length)
    }
  }

  draw(){
    fill(100,100,220, this.alpha)
    translate(this.startX, this.startY)
    ellipse(this.x, this.y, this.size, this.size)
  }
}