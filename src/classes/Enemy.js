import { polarToCart, rand } from "../Math"
import '../p5'
import Projectile from "./Projectile"
export default class Enemy {
  constructor(r, angle, s, type) {
    this.r = r
    this.angle = angle
    this.s = s
    this.type = type
    this.projs = []
    this.maxProjectiles = 10
    this.minProjectiles = 35
    this.x = 0
    this.y = 0
  }

  shoot([n, _this]) {

    const projectiles = []
    const projectileSize = 40
    for (let i = 0; i < n; i++) {
      projectiles.push(
        new Projectile(
          { x: _this.x, y: _this.y },
          projectileSize,
          360 / n * i,
          0.02,
          0.005,
        )
      )
    }
    projectiles.forEach(proj => proj.arr = projectiles)
    _this.projs = projectiles
  }

  update() {
    // polarToCart => {x:number, y:number}
    let { x, y } = polarToCart(this.r, this.angle)
    this.x = x
    this.y = y
    if(this.projs.length < 1){
      setTimeout(this.shoot, rand(800, 200), [rand(this.maxProjectiles,this.minProjectiles), this])
    }
  }

  draw() {
    this.projs.forEach(proj => {
      proj.update()
      proj.draw()
    })
    fill(255, 50, 50)
    ellipse(this.x, this.y, this.s, this.s)
  }
}
