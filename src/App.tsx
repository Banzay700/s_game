import { useLayoutEffect, useRef, useState } from 'react'
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
} from 'matter-js'

const BALL_RENDER_TIME = 10

const BALLS_RADIUS = {
  MIN: 20,
  MAX: 30,
}

const BALLS_STROKE_WIDTH = 1.3
const BALLS_STROKE_COLOR = '#000000'
const BALLS_QUANTITY = {
  MIN: 380,
  MAX: 500,
}

const COLORS = ['#FF459F', '#3474F9', '#FFDF42', '#1CD79C']

const BOX_WALLS_COLOR = '#66666'
const BOX_WALLS_WIDTH = 20

function App() {
  const canvas = useRef<HTMLDivElement>()

  const [simulation, setSimulation] = useState({
    active: false,
    ended: false,
  })
  console.count('App')
  const engine = useRef(
    Engine.create({
      gravity: { x: 0, y: 0.76 },
      constraintIterations: 29,
      positionIterations: 20,
      velocityIterations: 12,
    }),
  )
  const render = useRef<Render>()
  const runner = useRef()
  const ballCount = useRef<number>(0)
  const maxBalls = useRef<number>(
    Math.floor(
      Math.random() * (BALLS_QUANTITY.MAX - BALLS_QUANTITY.MIN) +
        BALLS_QUANTITY.MIN,
    ),
  )
  const generationInterval = useRef<number | null>(null)

  useLayoutEffect(() => {
    initializeRenderer()

    return () => {
      clearRenderer()
      if (generationInterval.current) {
        clearInterval(generationInterval.current)
      }
    }
  }, [])

  const handleButtonClick = () => {
    if (simulation.ended) {
      // Clear box functionality
      clearRenderer()
      initializeRenderer()
      setSimulation({ active: false, ended: false })
      ballCount.current = 0
      maxBalls.current = Math.floor(
        Math.random() * (BALLS_QUANTITY.MAX - BALLS_QUANTITY.MIN) +
          BALLS_QUANTITY.MIN,
      )
    } else {
      // Start simulation functionality
      setSimulation({ active: true, ended: false })

      generationInterval.current = setInterval(() => {
        if (ballCount.current < maxBalls.current) {
          addBall()
          ballCount.current++
        } else if (generationInterval.current) {
          clearInterval(generationInterval.current)
          setSimulation({ active: false, ended: true })
        }
      }, BALL_RENDER_TIME)
    }
  }

  const initializeRenderer = () => {
    if (!canvas.current) return

    const height = canvas.current.offsetHeight
    const width = canvas.current.offsetWidth

    render.current = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: '#334155',
      },
    })

    const mouse = Mouse.create(render.current.canvas)
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

    World.add(engine.current.world, mouseConstraint)
    render.current.mouse = mouse

    World.add(engine.current.world, [
      Bodies.rectangle(width / 2, height + 10, width, BOX_WALLS_WIDTH, {
        isStatic: true,
        render: {
          fillStyle: BOX_WALLS_COLOR,
        },
      }),
      Bodies.rectangle(width + 10, height / 2, BOX_WALLS_WIDTH, height, {
        isStatic: true,
        render: {
          fillStyle: BOX_WALLS_COLOR,
        },
      }),
      Bodies.rectangle(-10, height / 2, BOX_WALLS_WIDTH, height, {
        isStatic: true,
        render: {
          fillStyle: BOX_WALLS_COLOR,
        },
      }),
    ])

    Engine.run(engine.current)
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

  const addBall = () => {
    if (!canvas.current) return

    const width = canvas.current.offsetWidth
    const startX = width / 2
    const startY = -290
    const ballRadius =
      Math.random() * (BALLS_RADIUS.MAX - BALLS_RADIUS.MIN) + BALLS_RADIUS.MIN

    World.add(engine.current.world, [
      Bodies.circle(startX, startY, ballRadius, {
        friction: 0.4,
        restitution: 0.2,
        density: 0.001,
        render: {
          fillStyle: COLORS[Math.floor(Math.random() * COLORS.length)],
          strokeStyle: BALLS_STROKE_COLOR,
          lineWidth: BALLS_STROKE_WIDTH,
        },
      }),
    ])
  }

  const getButtonText = () => {
    if (simulation.active) return 'Progress...'
    if (simulation.ended) return 'Clear Box'
    return 'Start'
  }

  const getButtonStyle = () => {
    if (simulation.active) return 'bg-slate-500 cursor-not-allowed'
    if (simulation.ended)
      return 'bg-green-500 hover:bg-green-600 active:bg-green-700'
    return 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
  }

  return (
    <div className="fixed w-full h-full bg-slate-700 flex flex-col justify-center items-center">
      <p className="text-white mb-4 h-[24px]">
        {simulation.ended
          ? `Simulation complete! Total balls: ${maxBalls.current}`
          : ' '}
      </p>
      <div
        ref={canvas}
        className="bg-white h-[90%] w-[50%] flex justify-center items-center rounded-[12px] border-l-4 border-r-4 border-b-4 border-slate-800 overflow-hidden"
      ></div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <button
          onClick={handleButtonClick}
          disabled={simulation.active}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all ${getButtonStyle()}`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  )
}

export default App
