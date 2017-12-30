import './p5'
import { polarToCart } from './Math'
import Player from './classes/Player'
import Enemy from './classes/Enemy'

const W = window.innerWidth, H = window.innerHeight
const enemies = []
let player
window.setup = function (){
  createCanvas(W,H)
  background(10)
  enemies.push(new Enemy(width / 2, height / 2, 200, "shooter"))
  // Init player only after initializing all the enemies
  player = new Player(400, 50, enemies)
}
window.draw = function (){
  background(10)

  enemies.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })
  player.update()
  player.draw()
}