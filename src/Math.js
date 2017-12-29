const polarToCart = (r,angle) => {
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle)
  }
}

export {polarToCart}