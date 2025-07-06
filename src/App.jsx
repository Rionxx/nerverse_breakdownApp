import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Game from './pages/game.jsx'
import GameIntermediate from './pages/game_intermediate.jsx'
import GameAdvanced from './pages/game_advanced.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/game' element={<Game />} />
      <Route path='/gameintermediate' element={<GameIntermediate />} />
      <Route path='/gameadvanced' element={<GameAdvanced />} />
    </Routes>
  )
}

export default App
