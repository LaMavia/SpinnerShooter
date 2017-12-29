const polarToCart = (r,angle) => {
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle)
  }
}

const rand = (max, min = 0) => 
  Math.floor(Math.random() * (max - min) + min)
export {polarToCart, rand}