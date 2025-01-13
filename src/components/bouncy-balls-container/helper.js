import { Mouse, MouseConstraint } from 'matter-js'

const COLORS = ['red', 'blue', 'green', 'yellow']
const SIZES = ['s', 'm', 'l']

const DIAMETERS = {
  s: 17,
  m: 22.5,
  l: 34,
}

export const getMouseInstance = (render, engine) => {
  if (!render.current || !engine.current) return

  const mouse = Mouse.create(render.current.canvas)
  const mouseConstraint = MouseConstraint.create(engine.current, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  })

  return { mouse, mouseConstraint }
}

export const getBallRandomData = () => {
  const size = SIZES[Math.floor(Math.random() * SIZES.length)]
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const texture = `/src/assets/${color}-${size}.png`
  const diameter = DIAMETERS[size]

  return {
    texture,
    diameter,
  }
}
