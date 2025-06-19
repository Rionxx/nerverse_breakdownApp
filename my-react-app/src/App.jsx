import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Game from './pages/game.jsx' 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/game' element={<Game />} />
    </Routes>
  )
}

export default App
