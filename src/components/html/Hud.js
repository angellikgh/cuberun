import { useEffect, useState, useRef } from 'react'
import { useStore } from '../../state/useStore'

import '../../styles/hud.css'

export default function Hud() {
  const score = useStore(s => s.score)
  const speed = useStore(s => s.currentSpeed)
  const level = useStore(s => s.level)

  const gameOver = useStore(s => s.gameOver)
  const gameStarted = useStore(s => s.gameStarted)
  const [shown, setShown] = useState(false)
  const [showSpeedup, setShowSpeedup] = useState(false)

  useEffect(() => {
    if (gameStarted && !gameOver) {
      setShown(true)
    } else {
      setShown(false)
    }
  }, [gameStarted, gameOver])

  useEffect(() => {
    if (level > 0) {
      setShowSpeedup(true)

      const timer = setTimeout(() => {
        setShowSpeedup(false)
      }, 1000)

      return () => {
        clearTimeout(timer)
        setShowSpeedup(false)
      }
    }
  }, [level])


  return shown ? (
    <div className="hud">
      {showSpeedup && (
        <div className="center">
          <h3 className="center__speedup">SPEED UP</h3>
        </div>
      )}
      <div className="bottomLeft">
        <div className="score">
          <h3 className="score__title">LEVEL</h3>
          <h1 className="score__number">{level + 1}</h1>
          <h3 className="score__title">KM/H</h3>
          <h1 className="score__number">{(speed * 400).toFixed(0)}</h1>
          <h3 className="score__title">SCORE</h3>
          <h1 className="score__number">{score.toFixed(0)}</h1>
        </div>
      </div>
    </div>
  ) : null
}