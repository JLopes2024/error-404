function Progress({ current = 1, total = 5 }) {
  const percentage = (current / total) * 100

  return (
    <div className="game-progress">
      <div className="game-progress-info">
        <span>PADRÃO</span>

        <strong>
          {current}/{total}
        </strong>
      </div>

      <div className="game-progress-track">
        <div
          className="game-progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default Progress