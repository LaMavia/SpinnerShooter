const CON = {
  Fib: 1.6180339887498948482,
  Lamb: 1.30357
}

const polarToCart = (r,angle) => {
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle)
  }
}

const cartToPolar = (x,y) => {
  return {
    r: Math.sqrt(x**2 + y**2),
    angle: Math.atan2(y,x)
  }
}

const pit = (x,y) => Math.sqrt(x**2 + y**2)

const rand = (max, min = 0) => 
  Math.floor(Math.random() * (max - min) + min)

const sum = (prev, curr) => prev + curr
const div = (x,y) => x / y

const foldl = (foo, num, arr) => arr.reduce(foo, num)
const foldr = (foo, num, arr) => arr.reverse().reduce((prev, curr) => foo(curr,prev), num)

const _null = (arr) => Boolean(arr.length === 0)
// const all  

export {polarToCart, rand, sum, pit, CON}