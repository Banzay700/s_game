import { useState } from 'react'
import PropTypes from 'prop-types'
import { CircleTimer } from '@/ui'
import s from './GameRightSection.module.css'

const GameRightSection = ({ isGameFinished }) => {
  const [isTimerFinished, setIsTimerFinished] = useState(false)

  return (
    <div className={s.sectionWrapper}>
      {!isTimerFinished && isGameFinished && (
        <CircleTimer duration={3} onFinish={() => setIsTimerFinished(true)} />
      )}
    </div>
  )
}

GameRightSection.propTypes = {
  isGameFinished: PropTypes.bool.isRequired,
}

export default GameRightSection
