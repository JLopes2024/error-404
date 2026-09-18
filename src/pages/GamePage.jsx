import {
  useCallback,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import Timer from '../components/Timer'
import Progress from '../components/Progress'
import QuestionCard from '../components/QuestionCard'
import SystemMessage from '../components/SystemMessage'
import PasswordDisplay from '../components/PasswordDisplay'

import {
  challenges,
  finalPassword,
} from '../data/challenges'

import '../styles/game.css'


function normalizeText(value) {
  return String(value)
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}


function GamePage() {
  const navigate = useNavigate()

  const [challengeIndex, setChallengeIndex] =
    useState(0)

  const [questionIndex, setQuestionIndex] =
    useState(0)

  const [answers, setAnswers] =
    useState([])

  const [unlockedLetters, setUnlockedLetters] =
    useState([])

  const [phase, setPhase] =
    useState('questions')

  const [message, setMessage] =
    useState(null)

  const [breakAnswer, setBreakAnswer] =
    useState('')

  const [finalAnswer, setFinalAnswer] =
    useState('')

  const [locked, setLocked] =
    useState(false)


  const currentChallenge =
    challenges[challengeIndex]

  const currentQuestion =
    currentChallenge?.questions[questionIndex]


  const handleTimeExpired =
    useCallback(() => {
      navigate('/resultado', {
        state: {
          success: false,
          reason: 'time',
        },
        replace: true,
      })
    }, [navigate])


  // ======================================================
  // PERGUNTAS
  // ======================================================

  function handleAnswer(answer) {
    if (
      locked ||
      !currentQuestion
    ) {
      return
    }

    if (
      answer !==
      currentQuestion.correctAnswer
    ) {
      setMessage({
        type: 'error',
        text:
          'RESPOSTA INCORRETA. TENTE NOVAMENTE.',
      })

      return
    }

    setLocked(true)

    const updatedAnswers = [
      ...answers,
      answer,
    ]

    setAnswers(updatedAnswers)

    setMessage({
      type: 'success',
      text:
        'RESPOSTA REGISTRADA.',
    })

    const isLastQuestion =
      questionIndex ===
      currentChallenge.questions.length - 1

    if (isLastQuestion) {
      setTimeout(() => {
        setMessage(null)
        setPhase('pattern')
        setLocked(false)
      }, 650)

      return
    }

    setTimeout(() => {
      setQuestionIndex(
        (current) =>
          current + 1,
      )

      setMessage(null)
      setLocked(false)
    }, 550)
  }


  // ======================================================
  // VALIDAR QUEBRA DO PADRÃO
  // ======================================================

  function validateBreakAnswer(rawValue) {
    const rule =
      currentChallenge.breakChallenge

    const value =
      normalizeText(rawValue)

    const expected =
      normalizeText(
        rule.expected,
      )

    const validAnswers =
      rule.validAnswers.map(
        normalizeText,
      )

    if (!value) {
      return {
        success: false,
        message:
          'DIGITE UMA RESPOSTA.',
      }
    }

    if (
      value === expected
    ) {
      return {
        success: false,
        message:
          'PREVISÍVEL. ERA EXATAMENTE ESSA RESPOSTA QUE O SISTEMA ESPERAVA.',
      }
    }

    if (
      validAnswers.includes(
        value,
      )
    ) {
      return {
        success: true,
      }
    }

    return {
      success: false,
      message:
        'VOCÊ QUEBROU O PADRÃO, MAS TAMBÉM QUEBROU A REGRA.',
    }
  }


  function submitBreakAnswer(value) {
    const result =
      validateBreakAnswer(
        value,
      )

    if (!result.success) {
      setMessage({
        type: 'error',
        text: result.message,
      })

      return
    }

    setUnlockedLetters(
      (current) => [
        ...current,
        currentChallenge.letter,
      ],
    )

    setBreakAnswer('')
    setMessage(null)
    setPhase('success')
  }


  function handleBreakSubmit(event) {
    event.preventDefault()

    submitBreakAnswer(
      breakAnswer,
    )
  }


  // ======================================================
  // CAMPO DE RESPOSTA
  // ======================================================

  function handleBreakInput(event) {
    let value =
      event.target.value

    const isNumeric =
      currentChallenge
        .breakChallenge
        .inputType === 'number'

    if (isNumeric) {
      value =
        value.replace(
          /[^0-9]/g,
          '',
        )
    }

    setBreakAnswer(value)

    if (message) {
      setMessage(null)
    }
  }


  // ======================================================
  // PRÓXIMO PADRÃO
  // ======================================================

  function handleContinue() {
    const isLastChallenge =
      challengeIndex ===
      challenges.length - 1

    if (isLastChallenge) {
      setPhase('password')
      setMessage(null)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    setChallengeIndex(
      (current) =>
        current + 1,
    )

    setQuestionIndex(0)
    setAnswers([])
    setBreakAnswer('')
    setMessage(null)
    setLocked(false)
    setPhase('questions')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  // ======================================================
  // SENHA FINAL
  // ======================================================

  function handleFinalPassword(event) {
    event.preventDefault()

    const answer =
      normalizeText(
        finalAnswer,
      )

    if (
      answer !==
      finalPassword
    ) {
      setMessage({
        type: 'error',
        text:
          'SENHA INCORRETA. OBSERVE AS LETRAS RECUPERADAS.',
      })

      return
    }

    /*
      IMPORTANTE:
      NÃO limpamos o cronômetro aqui.

      O Timer ainda está montado nesta tela.
      Se apagarmos o tempo agora, ele entenderá
      que chegou em 00:00 e disparará derrota.
    */

    navigate('/resultado', {
      state: {
        success: true,
      },
      replace: true,
    })
  }


  if (!currentChallenge) {
    return null
  }


  const breakConfig =
    currentChallenge
      .breakChallenge

  const isNumericChallenge =
    breakConfig.inputType ===
    'number'


  return (
    <main className="game-page">

      <header className="game-header">

        <Timer
          onExpire={
            handleTimeExpired
          }
        />

        <Progress
          current={
            challengeIndex + 1
          }
          total={
            challenges.length
          }
        />

      </header>


      <section className="game-content">

        {phase !== 'password' && (

          <div className="game-password-status">

            <span>
              SENHA RECUPERADA
            </span>

            <PasswordDisplay
              letters={
                unlockedLetters
              }
              total={
                challenges.length
              }
            />

          </div>

        )}


        {/* ==================================================
            PERGUNTAS
        ================================================== */}

        {phase ===
          'questions' &&
          currentQuestion && (

          <>

            <div className="game-stage-label">
              {
                currentChallenge.title
              }
            </div>


            <QuestionCard
              question={
                currentQuestion
              }
              questionNumber={
                questionIndex + 1
              }
              totalQuestions={
                currentChallenge
                  .questions
                  .length
              }
              onAnswer={
                handleAnswer
              }
              disabled={
                locked
              }
            />


            {message && (

              <SystemMessage
                type={
                  message.type
                }
              >
                {message.text}
              </SystemMessage>

            )}


            {answers.length > 0 && (

              <div className="answers-history">

                <span>
                  RESPOSTAS REGISTRADAS
                </span>

                <div className="answers-history-values">

                  {answers.map(
                    (
                      answer,
                      index,
                    ) => (

                      <strong
                        key={`${answer}-${index}`}
                      >
                        {answer}
                      </strong>

                    ),
                  )}

                </div>

              </div>

            )}

          </>

        )}


        {/* ==================================================
            QUEBRA DO PADRÃO
        ================================================== */}

        {phase === 'pattern' && (

          <section className="pattern-break">

            <span className="pattern-small">
              RESPOSTAS REGISTRADAS
            </span>


            <div className="pattern-sequence">

              {answers.map(
                (
                  answer,
                  index,
                ) => (

                  <span
                    key={`${answer}-${index}`}
                    className={
                      answer.length > 3
                        ? 'pattern-sequence-text'
                        : ''
                    }
                  >
                    {answer}
                  </span>

                ),
              )}

            </div>


            <div className="pattern-warning">

              <span>
                !
              </span>

              <p>
                PADRÃO DETECTADO
              </p>

            </div>


            <h2>
              {
                breakConfig.prompt
              }
            </h2>


            <div className="pattern-rule">

              <span>
                REGRA
              </span>

              <p>
                {
                  breakConfig.rule
                }
              </p>

            </div>


            <form
              className="pattern-form"
              onSubmit={
                handleBreakSubmit
              }
            >

              <input
                type="text"

                inputMode={
                  isNumericChallenge
                    ? 'numeric'
                    : 'text'
                }

                pattern={
                  isNumericChallenge
                    ? '[0-9]*'
                    : undefined
                }

                value={
                  breakAnswer
                }

                onChange={
                  handleBreakInput
                }

                placeholder="?"

                aria-label="Digite sua resposta"

                autoComplete="off"

                autoCapitalize={
                  isNumericChallenge
                    ? 'off'
                    : 'characters'
                }

                maxLength={
                  isNumericChallenge
                    ? 4
                    : 20
                }

                autoFocus
              />


              <button type="submit">
                QUEBRAR PADRÃO
              </button>

            </form>


            {message && (

              <SystemMessage
                type={
                  message.type
                }
              >
                {message.text}
              </SystemMessage>

            )}

          </section>

        )}


        {/* ==================================================
            PADRÃO QUEBRADO
        ================================================== */}

        {phase === 'success' && (

          <section className="pattern-success">

            <p className="success-alert">
              ⚠ COMPORTAMENTO NÃO PREVISTO
            </p>


            <div className="success-brush">

              <span>
                REGRA MANTIDA
              </span>

              <strong>
                PADRÃO QUEBRADO!
              </strong>

            </div>


            <p className="success-copy">
              Você encontrou uma resposta
              válida que o sistema não
              conseguiu prever.
            </p>


            <div className="letter-unlocked">

              <span>
                LETRA RECUPERADA
              </span>

              <strong>
                {
                  currentChallenge
                    .letter
                }
              </strong>

            </div>


            <PasswordDisplay
              letters={
                unlockedLetters
              }
              total={
                challenges.length
              }
            />


            <button
              type="button"
              className="continue-button"
              onClick={
                handleContinue
              }
            >

              {
                challengeIndex ===
                challenges.length - 1
                  ? 'DESCOBRIR A SENHA'
                  : 'PRÓXIMO PADRÃO'
              }

            </button>

          </section>

        )}


        {/* ==================================================
            SENHA FINAL
        ================================================== */}

        {phase === 'password' && (

          <section className="final-password">

            <p className="final-password-eyebrow">
              5 PADRÕES QUEBRADOS
            </p>


            <h1>
              SAÍDA
              <br />
              ENCONTRADA?
            </h1>


            <p>
              Você recuperou cinco
              letras. Use-as para
              descobrir a senha final.
            </p>


            <PasswordDisplay
              letters={
                unlockedLetters
              }
              total={
                challenges.length
              }
            />


            <form
              className="final-password-form"
              onSubmit={
                handleFinalPassword
              }
            >

              <input
                type="text"

                value={
                  finalAnswer
                }

                onChange={(
                  event,
                ) => {
                  setFinalAnswer(
                    event.target.value,
                  )

                  if (message) {
                    setMessage(null)
                  }
                }}

                maxLength={5}

                placeholder="DIGITE A SENHA"

                autoComplete="off"

                autoCapitalize="characters"
              />


              <button type="submit">
                DESBLOQUEAR SAÍDA
              </button>

            </form>


            {message && (

              <SystemMessage
                type={
                  message.type
                }
              >
                {message.text}
              </SystemMessage>

            )}

          </section>

        )}

      </section>

    </main>
  )
}


export default GamePage