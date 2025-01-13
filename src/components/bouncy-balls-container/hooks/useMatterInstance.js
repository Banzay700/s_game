import { useRef } from 'react'
import { Engine } from 'matter-js'

export const useMatterInstance = () => {
  const engine = useRef(Engine.create())
  const render = useRef()
  const runner = useRef()
  const canvas = useRef()

  return { engine, render, runner, canvas }
}
