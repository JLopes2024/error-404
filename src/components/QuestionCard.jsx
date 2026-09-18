function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  disabled = false,
}) {
  return (
    <section className="question-card">
      <div className="question-card-header">
        <span>
          PERGUNTA {questionNumber}/{totalQuestions}
        </span>
      </div>

      <h2>{question.question}</h2>

      <div className="question-options">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className="question-option"
            disabled={disabled}
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuestionCard