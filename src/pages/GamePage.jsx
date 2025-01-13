import { useState } from 'react'

import { BouncyBallsContainer } from '@/components'
import { ContentContainer } from '@/ui'
import { GameLeftSection, GameRightSection } from '@/blocks'

const simulationConfig = {
  container: {
    color: 'transparent',
    width: 30,
  },
  delay: 1000,
  renderTime: 10,
  quantity: { min: 260, max: 340 },
}

const GamePage = () => {
  const [ballsCount, setBallsCount] = useState(0)
  const [isGameFinished, setIsGameFinished] = useState(false)

  console.log(ballsCount)

  const handleSimulationEnd = (count) => {
    setBallsCount(count)
    setIsGameFinished(true)
  }

  return (
    <ContentContainer variant="gamePage">
      <GameLeftSection />
      <BouncyBallsContainer
        {...simulationConfig}
        onSimulationEnd={handleSimulationEnd}
        simulationEndDelay={3500}
      />
      <GameRightSection isGameFinished={isGameFinished} />
    </ContentContainer>
  )
}

export default GamePage
