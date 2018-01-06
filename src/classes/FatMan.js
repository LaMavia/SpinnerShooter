import { polarToCart, rand } from "../Math"
import uuid from 'uuid'
import '../p5'
import Projectile from "./Projectile"
/** 
 *@todo Add Enemy types:
    follower...
*/
export default class FatMan {
  constructor(x, y, s) { // ! Changed from (r,angle,s,type) => (x,y,s,type)
    // this.r = r
    // this.angle = angle
    this.size = s
    this.projs = []
    this.maxProjectiles = 15
    this.minProjectiles = 6
    this.x = x
    this.y = y
    this.maxDist = s * Math.floor(2.6)
    this.id = uuid.v4()
  }

  shoot([n, _this]) {

    const projectiles = []
    const projectileSize = 40
    for (let i = 0; i < n; i++) {
      const projAngle = Math.floor(360 / (n - 1)) * i
      projectiles.push(
        new Projectile(
          { x: _this.x, y: _this.y },
          projectileSize,
          projAngle,
          0.02,
          0.005,
          parent = _this
        )
      )
    }
    projectiles.forEach(proj => proj.arr = projectiles)
    _this.projs = projectiles
  }

  update() {
    // polarToCart => {x:number, y:number}
    // let { x, y } = polarToCart(this.r, this.angle)
    // this.x = x
    // this.y = y
    if(this.projs.length < 1){
      setTimeout(this.shoot, rand(800, 200), [rand(this.maxProjectiles,this.minProjectiles), this])
    }
  }

  draw() {
    this.projs.forEach(proj => {
      proj.update()
      proj.draw()
    })

    push()

    fill(255, 50, 50)
    ellipse(this.x, this.y, this.size, this.size)
    fill(255,50,50,150)
    ellipse(this.x, this.y, this.s * random(10,5))

    pop()
  }
}
