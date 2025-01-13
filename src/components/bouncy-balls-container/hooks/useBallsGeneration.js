import { useRef } from 'react'

export const useBallsGeneration = (ballsQuantity) => {
  const ballCount = useRef(0)
  const maxBalls = useRef(
    Math.floor(
      Math.random() * (ballsQuantity.max - ballsQuantity.min) +
        ballsQuantity.min,
    ),
  )
  const generationInterval = useRef(null)

  return {
    ballCount,
    maxBalls,
    generationInterval,
  }
}
