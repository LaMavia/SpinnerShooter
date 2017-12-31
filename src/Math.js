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

const rand = (max, min = 0) => 
  Math.floor(Math.random() * (max - min) + min)

const sum = (prev, curr) => prev + curr
export {polarToCart, rand, sum}