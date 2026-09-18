import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'
import TVPage from './pages/TVPage'
import PhotoPage from './pages/PhotoPage'

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<StartPage />}
      />

      <Route
        path="/game"
        element={<GamePage />}
      />

      <Route
        path="/resultado"
        element={<ResultPage />}
      />

      {/* ROTA DE TESTE — RESULTADO POSITIVO */}
      <Route
        path="/resultado/sucesso"
        element={
          <Navigate
            to="/resultado"
            replace
            state={{
              success: true,
            }}
          />
        }
      />

      {/* ROTA DE TESTE — TEMPO ESGOTADO */}
      <Route
        path="/resultado/erro"
        element={
          <Navigate
            to="/resultado"
            replace
            state={{
              success: false,
              reason: 'time',
            }}
          />
        }
      />

      <Route
        path="/foto"
        element={<PhotoPage />}
      />

      <Route
        path="/tv"
        element={<TVPage />}
      />

    </Routes>
  )
}

export default App