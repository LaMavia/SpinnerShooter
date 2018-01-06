import { polarToCart, sum, pit } from "../Math"
import "../p5"
export default class Player {
  /** 
    r    = distance from center
    size = player's size (radius)

    @todo Add focusing on other enemies (<- Q/E ->)
  */
  constructor(r, s, enemies) {
    this.r = r
    this.size = s
    this.originalSize = s
    this.angle = 0

    this.x = 0
    this.dx = 0.03
    this.maxDX = 0.04
    this.y = 0
    this.dy = 0
    this.speed = 0.025
    this.color = [255, 255, 255]

    this.isAlive = true
    this.enemies = enemies
    this.focusedEnemy = enemies[0] // Default: Focusing on the first enemy
    this.score = {
      speed: [], //
      distance: [], // Lower is better
      waves: 0
    }
    this.finalScore = 0

    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 37: // Left Arrow
          this.move(-1, 0)
          break
        case 39: // Right Arrow
          this.move(1, 0)
          break
        case 40: // Down Arrow
          this.move(0, -1)
          break
        case 38: // Up Arrow (Y = 0 in on top 😅)
          this.move(0, 1)
          break
        case 32: // Spacebar
          this.ultra()
          break

        case 81: // Q
          this.switchEnemy(false)
          break
        case 69: //E
          this.switchEnemy(true)
          break
      }
    })
  }

  ultra() {
    // Because "super" was already taken...thx js....
    if (this.size === this.originalSize) {
      this.size = this.originalSize / 2
    }
  }

  switchEnemy(next) {
    const focusableEnemies = this.enemies.filter(enemy => enemy.projs || enemy.baseX)
    const currentEnemyIndex = focusableEnemies.findIndex(
      enemy => enemy.id === this.focusedEnemy.id
    )
    if (next && focusableEnemies.length > currentEnemyIndex + 1) {
      this.focusedEnemy = this.enemies[currentEnemyIndex + 1]
    } else if (!next && currentEnemyIndex > 0) {
      this.focusedEnemy = this.enemies[currentEnemyIndex - 1]
    }
  }

  didTouch() {
    let res = false
    this.enemies.forEach(enemy => {
      // Checking if touched any enemy
      if ( dist(
          this.x + this.focusedEnemy.x + (this.focusedEnemy.baseX ? this.focusedEnemy.baseX : 0),
          this.y + this.focusedEnemy.y + (this.focusedEnemy.baseY ? this.focusedEnemy.baseY : 0),
          enemy.x + (enemy.baseX ? enemy.baseX : 0),
          enemy.y + (enemy.baseY ? enemy.baseY : 0)
        ) < this.size / 2 + enemy.size / 2) {
        res = true
      }

      // Checking if touched any projectile
      if (enemy.projs && !res) { // !res for optimalization. If already touched an enemy -> there's no need to check if touched enemy's projectile :)
        enemy.projs.forEach(proj => {
          const distance = dist(
            this.x + this.focusedEnemy.x + (this.focusedEnemy.baseX ? this.focusedEnemy.baseX : 0),
            this.y + this.focusedEnemy.y + (this.focusedEnemy.baseY ? this.focusedEnemy.baseY : 0),
            proj.x + proj.startX + (proj.parent.baseX ? proj.parent.baseX : 0),
            proj.y + proj.startY + (proj.parent.baseY ? proj.parent.baseY : 0)
          )
          if (distance <= this.size / 2 + proj.size / 2) {
            res = true
          }
        })
      }
    })
    return res
  }

  move(fX, fY) {
    if (this.isAlive) {
      //Updating acceleration based on applied force
      this.dx += this.speed * fX // Angle
      this.dy += this.speed * fY * 100 // Radius = distance from center

      // Checking max speed (X)
      if (this.dx > this.maxDX || this.dx < -this.maxDX) {
        this.dx = this.maxDX * Math.sign(this.dx)
      }
    }
  }

  deathHandler() {
    // XD
    // Do something amazzzing!
    // Sum the scores and display them!

    this.color = [255, 0, 0]
    const speed = this.score.speed.map(Math.abs).reduce(sum, 0)
    const distance = this.score.distance
      .map(dist => Math.abs(width / 2 - dist))
      .reduce(sum, 0)
    this.finalScore = Math.floor(
      [distance / 100, speed * 100].reduce(sum, 0) * this.score.waves
    )
  }

  update() {
    if (this.isAlive) {
      this.angle += this.dx

      if (this.size === this.originalSize) {
        this.originalSize = map(this.r, 0, width / 2, 12, 90) // Resizing when changing distance
        this.size = this.originalSize
      } else if (this.size < this.originalSize) { // Growing
        this.size += 0.5
      } else { // If bigger than original size
        this.size = this.originalSize
      }

      if (this.r < this.focusedEnemy.maxDist) { // If loser than max range
        this.r += this.dy
      } else { // If further than max range, set to max range
        this.r = this.focusedEnemy.maxDist - 0.001
        this.dy = 0
      }

      this.dy /= 1.3
      // polarToCart => {x:number, y:number}
      let { x, y } = polarToCart(this.r, this.angle)
      this.x = x
      this.y = y

      this.score.speed.push(this.dx)
      this.score.distance.push(this.r)

      if (this.focusedEnemy.projs.length === 1) {
        // Checking if Player survived the wave
        this.score.waves += 1
      }

      this.isAlive = !this.didTouch()
    } else {
      this.deathHandler()
    }
  }

  draw() {
    push()

    if (this.isAlive) {
      // Drawing Text (num of waves)
      fill(255)
      textSize(40)
      const _textSize = 50 // Prefixed because of P5 function textSize()
      const textPos = {
        x1: width / 2 - _textSize / 2,
        y1: 10,
        x2: width / 2 + _textSize / 2,
        y2: _textSize + 10
      }
      text(this.score.waves, textPos.x1, textPos.y1, textPos.x2, textPos.y2)
      // Drawing Player
      const [r, g, b] = this.color
      if(this.focusedEnemy.baseX){
        translate(this.focusedEnemy.x + this.focusedEnemy.baseX, this.focusedEnemy.y + this.focusedEnemy.baseY)
      }else{
        translate(this.focusedEnemy.x, this.focusedEnemy.y)
      }
      fill(r, g, b)
      ellipse(this.x, this.y, this.size, this.size)
    } else {
      fill(20)
      rect(0, 0, width, height)
      const _textSize = 70
      textSize(_textSize)
      textAlign(CENTER)
      fill(255, 100, 100)
      text(
        `Score: ${this.finalScore}`,
        0,
        height / 2 - _textSize / 2,
        width,
        height / 2 + _textSize / 2
      )
    }

    pop()
  }
}
