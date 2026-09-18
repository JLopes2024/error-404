function PasswordDisplay({ letters = [], total = 5 }) {
  return (
    <div className="password-display">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={
            letters[index]
              ? 'password-letter password-letter--unlocked'
              : 'password-letter'
          }
        >
          {letters[index] || '_'}
        </span>
      ))}
    </div>
  )
}

export default PasswordDisplay