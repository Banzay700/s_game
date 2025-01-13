import PropTypes from 'prop-types'
import { Engine, Render, World, Bodies, Runner } from 'matter-js'

import { useMatterInstance } from './hooks/useMatterInstance'
import { useBallsGeneration } from './hooks/useBallsGeneration'
import { useSimulation } from './hooks/useSimulation'
import { getMouseInstance, getBallRandomData } from './helper'

import s from './BouncyBallsContainer.module.css'

const BouncyBallContainer = ({
  renderTime,
  quantity,
  container,
  delay,
  simulationEndDelay = 0,
  onSimulationEnd,
}) => {
  const { engine, render, runner, canvas } = useMatterInstance()
  const { ballCount, maxBalls, generationInterval } =
    useBallsGeneration(quantity)

  const wallsProps = {
    isStatic: true,
    render: { fillStyle: container.color },
  }

  const addBall = () => {
    if (!canvas.current) return

    const width = canvas.current.offsetWidth
    const startX = width / 2
    const startY = -290

    const { texture, diameter } = getBallRandomData()

    World.add(engine.current.world, [
      Bodies.circle(startX, startY, diameter, {
        friction: 0.001,
        restitution: 0.001,
        density: 0.001,
        render: {
          sprite: { texture },
        },
      }),
    ])
  }

  const startSimulation = () => {
    generationInterval.current = setInterval(() => {
      if (ballCount.current < maxBalls.current) {
        addBall()
        ballCount.current++
      } else if (generationInterval.current) {
        clearInterval(generationInterval.current)
        setTimeout(() => {
          onSimulationEnd(maxBalls.current)
        }, simulationEndDelay)
      }
    }, renderTime)
  }

  const initializeRenderer = () => {
    if (!canvas.current) return

    const height = canvas.current.offsetHeight
    const width = canvas.current.offsetWidth

    render.current = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    })

    const { mouse, mouseConstraint } = getMouseInstance(render, engine)

    World.add(engine.current.world, mouseConstraint)
    render.current.mouse = mouse

    World.add(engine.current.world, [
      Bodies.rectangle(
        width / 2,
        height + 10,
        width,
        container.width,
        wallsProps,
      ),
      Bodies.rectangle(
        width + 10,
        height / 2,
        container.width,
        height,
        wallsProps,
      ),
      Bodies.rectangle(-10, height / 2, container.width, height, wallsProps),
    ])

    Render.run(render.current)
    runner.current = Runner.create()
    Runner.run(runner.current, engine.current)
  }

  const clearRenderer = () => {
    if (!render.current) return
    Render.stop(render.current)
    Runner.stop(runner.current)
    render.current.canvas.remove()

    if (!engine.current) return
    World.clear(engine.current.world)
    Engine.clear(engine.current)
  }

  useSimulation({
    delay,
    startSimulation,
    clearRenderer,
    generationInterval,
    initializeRenderer,
  })

  return (
    <div className={s.container}>
      <div ref={canvas} className={s.canvas}></div>
      <img src="/src/assets/jar.svg" alt="jar" className={s.jar} />
    </div>
  )
}

BouncyBallContainer.propTypes = {
  renderTime: PropTypes.number.isRequired,
  quantity: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  container: PropTypes.shape({
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  delay: PropTypes.number.isRequired,
  onSimulationEnd: PropTypes.func.isRequired,
  simulationEndDelay: PropTypes.number,
}

export default BouncyBallContainer
