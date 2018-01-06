import '../p5'
import { polarToCart, rand } from '../Math'
import Projectile from './Projectile'

export default class Orbiter {
  constructor(baseX, baseY, size, r, speed){
    this.x = 0
    this.y = 0
    this.baseX = baseX
    this.baseY = baseY
    this.size = size
    this.r = r
    this.angle = 0
    this.speed = speed
    this.projs = []
    this.minProjectiles = 8
    this.maxProjectiles = 15
    this.maxDist = size * 3
    this.timeoutToShoot

    this.shoot = this.shoot.bind(this)
  }

  shoot([n, _this]) {

    const projectiles = []
    const projectileSize = 20
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

    this.timeoutToShoot = null
  }

  update(){
    this.angle += this.speed / 2
    this.r += noise(this.angle) * random(-1,1)
    const {x, y} = polarToCart(this.r, this.angle)
    this.x = x
    this.y = y

    if(this.projs.length < 1 && !this.timeoutToShoot){
      this.timeoutToShoot = setTimeout(this.shoot, rand(800, 200), [rand(this.maxProjectiles,this.minProjectiles), this])
    }
    console.log(this.projs.length)
  }

  draw(){
    push()

    fill(100, 200, 100)
    translate(this.baseX, this.baseY)
    ellipse(this.x, this.y, this.size, this.size)
    this.projs.forEach(proj => {
      proj.update()
      proj.draw()
    })

    pop()
  }
}