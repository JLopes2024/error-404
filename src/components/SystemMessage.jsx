function SystemMessage({ type = 'info', children }) {
  const symbols = {
    error: '×',
    success: '✓',
    info: '!',
  }

  return (
    <div className={`system-message system-message--${type}`}>
      <span className="system-message-status">
        {symbols[type] || '!'}
      </span>

      <p>{children}</p>
    </div>
  )
}

export default SystemMessage