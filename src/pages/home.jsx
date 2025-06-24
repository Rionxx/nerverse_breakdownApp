import React, { useState } from "react"
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import homeIcon from'/images/home_icon.jpeg'
import '../index.css'

function Home() {
  const navigate = useNavigate()
  const redirect = () => {
    const bgm = new Audio(`${import.meta.env.BASE_URL}/sounds/start_sound.mp3`)
    bgm.volume = 0.5
    bgm.play()
    navigate('/game')
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
      <div className="start_button">
        <button onClick={redirect}>
          ゲームスタート
        </button>
      </div>
    </div>
  )
}

export default Home