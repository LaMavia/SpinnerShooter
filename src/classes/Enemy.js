import { polarToCart } from '../Math'

export default class Enemy{
  constructor(r, angle, s, type){
    this.r = r
    this.angle = angle
    this.s = s
    this.type = type

    this.x = 0
    this.y = 0
  }

  update(){
    // polarToCart => {x:number, y:number}
    let {x,y} = polarToCart(this.r, this.angle)
    this.x = x
    this.y = y
  }

  draw(){
    fill(255,50,50)
    ellipse(this.x, this.y, this.s, this.s)
  }
}