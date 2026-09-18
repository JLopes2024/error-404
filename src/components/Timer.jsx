import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  getGameEndTime,
  getRemainingSeconds,
  startGameTimer,
} from '../utils/gameTimer'

function Timer({ onExpire }) {
  const [seconds, setSeconds] = useState(() => {
    if (!getGameEndTime()) {
      startGameTimer()
    }

    return getRemainingSeconds()
  })

  const expiredRef = useRef(false)

  useEffect(() => {
    function updateTimer() {
      const remaining = getRemainingSeconds()

      setSeconds(remaining)

      if (
        remaining <= 0 &&
        !expiredRef.current
      ) {
        expiredRef.current = true
        onExpire?.()
      }
    }

    updateTimer()

    const interval = setInterval(
      updateTimer,
      250,
    )

    return () => {
      clearInterval(interval)
    }
  }, [onExpire])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(remainingSeconds).padStart(2, '0')}`

  const isCritical = seconds <= 60
  const isVeryCritical = seconds <= 20

  return (
    <div
      className={[
        'game-timer',
        isCritical
          ? 'game-timer--critical'
          : '',
        isVeryCritical
          ? 'game-timer--very-critical'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="game-timer-label">
        TEMPO
      </span>

      <strong>
        {formattedTime}
      </strong>
    </div>
  )
}

export default Timer