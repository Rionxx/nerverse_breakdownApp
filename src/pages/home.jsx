import React, { useState } from "react"
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import homeIcon from'/images/home_icon.jpeg'
import '../index.css'

function Home() {
  const navigate = useNavigate()
  const redirect = (destination) => {
    const bgm = new Audio('/sounds/start_sound.mp3')
    bgm.volume = 0.5
    bgm.play()
    navigate(destination)
  }

  return (
    <div>
      <h1 className="title">
        <span style={{ color: "blue" }}>ロマ子</span>と
        <span style={{ color: "red" }}>マゾ豚</span>の
        <span style={{ color: "lime" }}>神経衰弱！？</span>
        </h1>
      <div className="home_icon">
        <img className="icon_image" src={homeIcon} alt="ホームアイコン" />
      </div>
      <br />

      <div className="buttons">
        <span className="start_button1">
          <button onClick={() => redirect('/game')} style={{ backgroundColor: "green" }}>
            下級マゾ豚
          </button>
        </span>
        <span className="start_button2">
          <button onClick={() => redirect('/gameintermediate')} style={{ backgroundColor: "orange" }}>
            中級マゾ豚
          </button>
        </span>
        <span className="start_button3">
          <button onClick={() => redirect('/gameadvanced')} style={{ backgroundColor: "red" }}>
            上級マゾ豚
          </button>
        </span>
      </div>
    </div>
  )
}

export default Home