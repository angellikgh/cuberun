import { useEffect, useState, useRef } from 'react'
import { useStore } from '../../state/useStore'

import '../../styles/hud.css'

export default function Hud() {
  const score = useStore(s => s.score)
  const speed = useStore(s => s.currentSpeed)
  const gameOver = useStore(s => s.gameOver)
  const gameStarted = useStore(s => s.gameStarted)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (gameStarted && !gameOver) {
      setShown(true)
    } else {
      setShown(false)
    }
  }, [gameStarted, gameOver])


  return shown ? (
    <div className="bottomLeft">
      <div className="score">
        <h3 className="score__title">KM/H</h3>
        <h1 className="score__number">{(speed * 300).toFixed(0)}</h1>
        <h3 className="score__title">SCORE</h3>
        <h1 className="score__number">{score.toFixed(0)}</h1>
      </div>
    </div>
  ) : null
}