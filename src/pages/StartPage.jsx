import { useNavigate } from 'react-router-dom'

import {
  startGameTimer,
} from '../utils/gameTimer'

import '../styles/game.css'

function StartPage() {
  const navigate = useNavigate()

  function iniciarGame() {
    startGameTimer()

    navigate('/game')
  }

  return (
    <main className="start-page">
      <span className="decorative-symbol symbol-one">
        ?
      </span>

      <span className="decorative-symbol symbol-two">
        +
      </span>

      <span className="decorative-symbol symbol-three">
        ×
      </span>

      <section className="start-container">
        <p className="start-eyebrow">
          Viva Fest apresenta
        </p>

        <div className="error-wrapper">
          <div className="error-background" />

          <h1 className="error-title">
            ERRO <span>404</span>
          </h1>
        </div>

        <h2 className="start-subtitle">
          <strong>Saída</strong>
          <br />
          não encontrada
        </h2>

        <p className="start-description">
          O sistema entrou em loop.
          <br />
          Resolva os desafios,
          descubra os padrões e
          encontre a saída.
        </p>

        <button
          type="button"
          className="start-button"
          onClick={iniciarGame}
        >
          Iniciar desafio
        </button>

        <p className="start-warning">
          Você terá apenas 5 minutos.
        </p>
      </section>
    </main>
  )
}

export default StartPage