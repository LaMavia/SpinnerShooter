const polarToCart = (r,angle) => {
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle)
  }
}

const rand = (max, min = 0) => 
  Math.floor(Math.random() * (max - min) + min)

const sum = (prev, curr) => prev + curr
export {polarToCart, rand, sum}