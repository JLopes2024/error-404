import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import '../styles/photo.css'

function PhotoPage() {
  const navigate = useNavigate()

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [cameraStatus, setCameraStatus] =
    useState('loading')

  const [photoUrl, setPhotoUrl] =
    useState(null)

  const [photoBlob, setPhotoBlob] =
    useState(null)

  const [errorMessage, setErrorMessage] =
    useState('')

  useEffect(() => {
    startCamera()

    return () => {
      stopCamera()
    }
  }, [])

  async function startCamera() {
    try {
      setCameraStatus('loading')
      setErrorMessage('')

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          'Câmera não disponível neste navegador.',
        )
      }

      stopCamera()

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 1280,
            },
          },

          audio: false,
        })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        await videoRef.current.play()
      }

      setCameraStatus('ready')
    } catch (error) {
      console.error(error)

      setCameraStatus('error')

      setErrorMessage(
        'Não foi possível acessar a câmera. Verifique a permissão do navegador.',
      )
    }
  }

  function stopCamera() {
    if (!streamRef.current) {
      return
    }

    streamRef.current
      .getTracks()
      .forEach((track) => {
        track.stop()
      })

    streamRef.current = null
  }

  function drawCoverImage(
    context,
    video,
    x,
    y,
    width,
    height,
  ) {
    const videoWidth =
      video.videoWidth

    const videoHeight =
      video.videoHeight

    const videoRatio =
      videoWidth / videoHeight

    const targetRatio =
      width / height

    let sourceWidth
    let sourceHeight
    let sourceX
    let sourceY

    if (videoRatio > targetRatio) {
      sourceHeight =
        videoHeight

      sourceWidth =
        videoHeight *
        targetRatio

      sourceX =
        (videoWidth -
          sourceWidth) /
        2

      sourceY = 0
    } else {
      sourceWidth =
        videoWidth

      sourceHeight =
        videoWidth /
        targetRatio

      sourceX = 0

      sourceY =
        (videoHeight -
          sourceHeight) /
        2
    }

    context.save()

    context.translate(
      x + width,
      y,
    )

    context.scale(-1, 1)

    context.drawImage(
      video,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height,
    )

    context.restore()
  }

  function drawBrush(
    context,
    x,
    y,
    width,
    height,
    color,
    rotation = 0,
  ) {
    context.save()

    context.translate(
      x + width / 2,
      y + height / 2,
    )

    context.rotate(
      (rotation * Math.PI) /
        180,
    )

    context.fillStyle =
      color

    context.fillRect(
      -width / 2,
      -height / 2,
      width,
      height,
    )

    context.restore()
  }

  function capturePhoto() {
    const video =
      videoRef.current

    const canvas =
      canvasRef.current

    if (
      !video ||
      !canvas ||
      video.readyState < 2
    ) {
      return
    }

    const context =
      canvas.getContext('2d')

    const WIDTH = 1080
    const HEIGHT = 1350

    canvas.width = WIDTH
    canvas.height = HEIGHT

    const NAVY =
      '#0A214D'

    const CREAM =
      '#F6EED8'

    const YELLOW =
      '#FADA34'

    const CORAL =
      '#F86A6E'

    const TURQUOISE =
      '#2BD0D4'

    /*
      FUNDO
    */

    context.fillStyle =
      CREAM

    context.fillRect(
      0,
      0,
      WIDTH,
      HEIGHT,
    )

    /*
      PINCELADAS
    */

    drawBrush(
      context,
      -80,
      60,
      520,
      95,
      TURQUOISE,
      -6,
    )

    drawBrush(
      context,
      760,
      170,
      400,
      85,
      YELLOW,
      8,
    )

    /*
      CABEÇALHO
    */

    context.fillStyle =
      NAVY

    context.textAlign =
      'center'

    context.font =
      '900 54px Arial'

    context.fillText(
      'VIVA FEST',
      WIDTH / 2,
      105,
    )

    context.font =
      '900 27px Arial'

    context.fillText(
      'ERRO 404 • SAÍDA ENCONTRADA',
      WIDTH / 2,
      155,
    )

    /*
      FOTO
    */

    const photoX = 70
    const photoY = 205

    const photoWidth =
      940

    const photoHeight =
      940

    context.fillStyle =
      NAVY

    context.fillRect(
      photoX + 16,
      photoY + 16,
      photoWidth,
      photoHeight,
    )

    drawCoverImage(
      context,
      video,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
    )

    context.strokeStyle =
      NAVY

    context.lineWidth = 12

    context.strokeRect(
      photoX,
      photoY,
      photoWidth,
      photoHeight,
    )

    /*
      RODAPÉ SOBRE A FOTO

      Agora é propositalmente
      pequeno e horizontal.
    */

    const footerX =
      photoX + 28

    const footerWidth =
      photoWidth - 56

    const footerHeight = 92

    const footerY =
      photoY +
      photoHeight -
      footerHeight -
      26

    context.fillStyle =
      'rgba(246, 238, 216, 0.94)'

    context.fillRect(
      footerX,
      footerY,
      footerWidth,
      footerHeight,
    )

    context.strokeStyle =
      NAVY

    context.lineWidth = 5

    context.strokeRect(
      footerX,
      footerY,
      footerWidth,
      footerHeight,
    )

    /*
      VIVA FEST PEQUENO
    */

    context.fillStyle =
      CORAL

    context.fillRect(
      footerX + 18,
      footerY + 23,
      130,
      45,
    )

    context.fillStyle =
      NAVY

    context.textAlign =
      'center'

    context.textBaseline =
      'middle'

    context.font =
      '900 18px Arial'

    context.fillText(
      'VIVA FEST',
      footerX + 83,
      footerY + 46,
    )

    /*
      TEXTO DO RODAPÉ
    */

    context.textAlign =
      'left'

    context.fillStyle =
      NAVY

    context.font =
      '900 43px Arial'

    context.fillText(
      'QUEBRAMOS O PADRÃO!',
      footerX + 175,
      footerY + 48,
    )

    /*
      FRASE FINAL FORA DA FOTO
    */

    context.textAlign =
      'center'

    context.fillStyle =
      NAVY

    context.font =
      '700 28px Arial'

    context.fillText(
      'Às vezes o problema não exige outra resposta.',
      WIDTH / 2,
      1220,
    )

    context.font =
      '900 31px Arial'

    context.fillText(
      'Exige outra forma de chegar até ela.',
      WIDTH / 2,
      1265,
    )

    context.font =
      '800 20px Arial'

    context.fillText(
      'VIVA FEST • DESAFIOS FAZEM PARTE DA VIDA',
      WIDTH / 2,
      1320,
    )

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return
        }

        if (photoUrl) {
          URL.revokeObjectURL(
            photoUrl,
          )
        }

        const url =
          URL.createObjectURL(
            blob,
          )

        setPhotoBlob(blob)
        setPhotoUrl(url)

        stopCamera()

        setCameraStatus(
          'captured',
        )
      },

      'image/jpeg',

      0.95,
    )
  }

  async function retakePhoto() {
    if (photoUrl) {
      URL.revokeObjectURL(
        photoUrl,
      )
    }

    setPhotoUrl(null)

    setPhotoBlob(null)

    await startCamera()
  }

  function savePhoto() {
    if (!photoUrl) {
      return
    }

    const link =
      document.createElement(
        'a',
      )

    link.href =
      photoUrl

    link.download =
      'viva-fest-quebramos-o-padrao.jpg'

    document.body.appendChild(
      link,
    )

    link.click()

    document.body.removeChild(
      link,
    )
  }

  async function sharePhoto() {
    if (!photoBlob) {
      return
    }

    try {
      const file =
        new File(
          [photoBlob],

          'viva-fest-quebramos-o-padrao.jpg',

          {
            type:
              'image/jpeg',
          },
        )

      if (
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        await navigator.share({
          title:
            'VIVA FEST — Saída Encontrada',

          text:
            'Quebramos o padrão no VIVA FEST!',

          files: [file],
        })

        return
      }

      savePhoto()
    } catch (error) {
      if (
        error?.name !==
        'AbortError'
      ) {
        console.error(
          error,
        )
      }
    }
  }

  return (
    <main className="photo-page">

      <section className="photo-container">

        <header className="photo-header">

          <span>
            VIVA FEST
          </span>

          <h1>
            REGISTRE

            <strong>
              A VITÓRIA
            </strong>
          </h1>

          <p>
            Vocês encontraram
            a saída. Agora
            guardem esse momento.
          </p>

        </header>


        {cameraStatus ===
          'loading' && (

          <div className="camera-message">

            <div className="camera-loader" />

            <strong>
              ABRINDO CÂMERA...
            </strong>

            <span>
              Autorize o acesso
              quando o navegador
              pedir.
            </span>

          </div>

        )}


        {cameraStatus ===
          'error' && (

          <div className="camera-error">

            <span>
              !
            </span>

            <h2>
              CÂMERA NÃO DISPONÍVEL
            </h2>

            <p>
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={
                startCamera
              }
            >
              TENTAR NOVAMENTE
            </button>

          </div>

        )}


        {cameraStatus !==
          'captured' && (

          <div
            className={`camera-area ${
              cameraStatus ===
              'ready'
                ? 'camera-area--ready'
                : ''
            }`}
          >

            <div className="camera-frame">

              <video
                ref={
                  videoRef
                }
                autoPlay
                muted
                playsInline
              />


              <div className="camera-overlay">

                <span className="camera-overlay-top">
                  ERRO 404 CORRIGIDO
                </span>


                <div className="camera-overlay-bottom">

                  <span className="camera-footer-brand">
                    VIVA FEST
                  </span>

                  <strong>
                    QUEBRAMOS O PADRÃO!
                  </strong>

                </div>

              </div>

            </div>


            {cameraStatus ===
              'ready' && (

              <>

                <p className="camera-tip">
                  Centralizem os
                  rostos ou o grupo
                  dentro da moldura.
                </p>

                <button
                  type="button"
                  className="camera-button"
                  onClick={
                    capturePhoto
                  }
                  aria-label="Tirar foto"
                >

                  <span />

                </button>

              </>

            )}

          </div>

        )}


        {cameraStatus ===
          'captured' &&
          photoUrl && (

          <section className="photo-result">

            <div className="photo-result-label">
              FOTO PRONTA
            </div>


            <img
              src={
                photoUrl
              }
              alt="Registro da vitória no desafio VIVA FEST"
            />


            <p>
              Às vezes o problema
              não exige outra
              resposta.

              <strong>
                Exige outra forma
                de chegar até ela.
              </strong>
            </p>


            <div className="photo-actions">

              <button
                type="button"
                className="photo-primary"
                onClick={
                  sharePhoto
                }
              >
                COMPARTILHAR FOTO
              </button>


              <button
                type="button"
                className="photo-secondary"
                onClick={
                  savePhoto
                }
              >
                SALVAR NO CELULAR
              </button>


              <button
                type="button"
                className="photo-tertiary"
                onClick={
                  retakePhoto
                }
              >
                TIRAR OUTRA
              </button>

            </div>

          </section>

        )}


        <button
          type="button"
          className="photo-back"
          onClick={() =>
            navigate('/')
          }
        >
          ENCERRAR EXPERIÊNCIA
        </button>


        <canvas
          ref={
            canvasRef
          }
          className="photo-canvas"
        />

      </section>

    </main>
  )
}

export default PhotoPage