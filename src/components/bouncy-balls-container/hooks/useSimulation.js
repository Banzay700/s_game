import { useLayoutEffect } from 'react'

export const useSimulation = ({
  delay,
  startSimulation,
  clearRenderer,
  generationInterval,
  initializeRenderer,
}) => {
  useLayoutEffect(() => {
    initializeRenderer()

    const startTimeout = setTimeout(() => {
      startSimulation()
    }, delay)

    return () => {
      clearRenderer()
      clearTimeout(startTimeout)
      if (generationInterval.current) {
        clearInterval(generationInterval.current)
      }
    }
  }, [])
}
