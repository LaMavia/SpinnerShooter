import './p5'
import { polarToCart } from './Math'
import Player from './classes/Player'
import Enemy from './classes/Enemy'

const W = window.innerWidth, H = window.innerHeight
const enemies = []
let player = new Player(400, 50, enemies)
window.setup = function (){
  createCanvas(W,H)
  background(10)
  enemies.push(new Enemy(0, 0, 200, "shooter"))
}
window.draw = function (){
  background(10)
  translate(width / 2, height / 2)
  fill(255,100,100)
  player.update()
  player.draw()
  enemies.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })
}