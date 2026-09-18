const TIMER_KEY = 'vivaFestGameEndTime'

export const GAME_DURATION_SECONDS = 5 * 60

export function startGameTimer() {
  const endTime = Date.now() + GAME_DURATION_SECONDS * 1000

  sessionStorage.setItem(TIMER_KEY, String(endTime))

  return endTime
}

export function getGameEndTime() {
  const storedEndTime = sessionStorage.getItem(TIMER_KEY)

  if (!storedEndTime) {
    return null
  }

  const endTime = Number(storedEndTime)

  if (Number.isNaN(endTime)) {
    return null
  }

  return endTime
}

export function getRemainingSeconds() {
  const endTime = getGameEndTime()

  if (!endTime) {
    return 0
  }

  const difference = endTime - Date.now()

  return Math.max(
    0,
    Math.ceil(difference / 1000),
  )
}

export function clearGameTimer() {
  sessionStorage.removeItem(TIMER_KEY)
}