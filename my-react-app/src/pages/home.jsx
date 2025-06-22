import React, { useState } from "react"
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import homeIcon from'/images/home_icon.jpeg'
import '../index.css'

function Home() {
  const navigate = useNavigate()
  const redirect = () => {
    navigate('/game')
  }

  return (
    <div>
      <h1>ロマ子とマゾ豚の神経衰弱！？</h1>
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