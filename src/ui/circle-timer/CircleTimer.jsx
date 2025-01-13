import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Heading } from '@/ui'
import s from './CircleTimer.module.css'

const CircleTimer = ({ duration = 10, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish()
    }
  }, [timeLeft, onFinish])

  return (
    <div className={s.timerContainer}>
      <svg className={s.circle} viewBox="0 0 36 36">
        <path
          className={s.circleBg}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={s.circleProgress}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <Heading variant="numbers" color="accent" className={s.timerText}>
        {timeLeft}
      </Heading>
    </div>
  )
}

CircleTimer.propTypes = {
  duration: PropTypes.number,
  onFinish: PropTypes.func,
}

export default CircleTimer
