import './p5'
import { polarToCart } from './Math'
import Player from './classes/Player'
import FatMan from './classes/FatMan'
import Messer from './classes/Messer'
import Orbiter from './classes/Orbiter'

const W = window.innerWidth, H = window.innerHeight
const enemies = []
let player
window.setup = function (){
  createCanvas(W,H)
  background(10)

  enemies.push(new FatMan(400, 400, 120))
  enemies.push(new FatMan(width - 500, height - 500, 120))

  enemies.push(new Orbiter(width / 2, height / 2, 70, height / 5, 0.04))

  for(let i = 0; i < 4; i++){
    enemies.push(new Messer(50, 1.5))
  }

  // Init player only after initializing all the enemies
  player = new Player(400, 60, enemies)
}
window.draw = function (){
  background(10)

  if(player || player.isAlive){
    enemies.forEach(enemy => {
      enemy.update()
      enemy.draw()
    })
  }

  player.update()
  player.draw()
}