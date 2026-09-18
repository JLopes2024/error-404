import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  clearGameTimer,
} from '../utils/gameTimer'

import '../styles/result.css'

function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const success =
    location.state?.success === true

  const reason =
    location.state?.reason

  function restartGame() {
    clearGameTimer()
    navigate('/')
  }

  function goToPhoto() {
    navigate('/foto')
  }

  // ======================================================
  // TEMPO ESGOTADO
  // ======================================================

  if (!success) {
    return (
      <main className="final-result final-result--fail">
        <span className="final-decor final-decor--one">
          ×
        </span>

        <span className="final-decor final-decor--two">
          ?
        </span>

        <section className="final-result-content">
          <p className="final-kicker">
            ERRO 408
          </p>

          <div className="final-fail-title">
            <span>TEMPO</span>
            <strong>ESGOTADO</strong>
          </div>

          <p className="final-fail-copy">
            {reason === 'time'
              ? 'O sistema encerrou esta tentativa.'
              : 'Não foi possível concluir o desafio.'}
          </p>

          <div className="final-thought-card">
            <span>ANTES DE TENTAR DE NOVO:</span>

            <strong>
              Você precisa insistir...
              ou mudar a estratégia?
            </strong>
          </div>

          <button
            type="button"
            className="final-primary-button"
            onClick={restartGame}
          >
            Tentar novamente
          </button>
        </section>
      </main>
    )
  }

  // ======================================================
  // VITÓRIA
  // ======================================================

  return (
    <main className="final-result final-result--success">
      <span className="final-decor final-decor--one">
        +
      </span>

      <span className="final-decor final-decor--two">
        ×
      </span>

      <span className="final-decor final-decor--three">
        ✓
      </span>

      <section className="final-result-content">
        <p className="final-kicker">
          ERRO 404 CORRIGIDO
        </p>

        <div className="final-status">
          <span>SISTEMA</span>
          <strong>RESTAURADO</strong>
        </div>

        <header className="final-title">
          <h1>
            SAÍDA
            <span>ENCONTRADA!</span>
          </h1>
        </header>

        <div className="final-achievement">
          <div>
            <strong>5/5</strong>
            <span>PADRÕES</span>
          </div>

          <div className="final-achievement-divider" />

          <div>
            <strong>5/5</strong>
            <span>LETRAS</span>
          </div>
        </div>

        <div className="final-password">
          <span>S</span>
          <span>A</span>
          <span>I</span>
          <span>D</span>
          <span>A</span>
        </div>

        <div className="final-message">
          <p>
            Às vezes o problema não exige
            outra resposta.
          </p>

          <strong>
            Exige outra forma de chegar até ela.
          </strong>
        </div>

        <p className="final-small-copy">
          Você observou, testou, errou,
          reinterpretou e mudou de estratégia.
        </p>

        <div className="final-actions">
          <button
            type="button"
            className="final-primary-button"
            onClick={goToPhoto}
          >
            Registrar a vitória
          </button>

          <button
            type="button"
            className="final-secondary-button"
            onClick={restartGame}
          >
            Jogar novamente
          </button>
        </div>

        <p className="final-photo-hint">
          📸 Tire uma foto e guarde esse momento.
        </p>
      </section>
    </main>
  )
}

export default ResultPage