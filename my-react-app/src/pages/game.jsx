import { React, useState, useEffect } from "react";
import card from'../images/card1.jpeg'
import '../index.css'

function Game() {
  const [time, setTime] = useState(0)
  const cardData = [
    {id: 1, image: card},
    {id: 2, image: card},
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const secs = (time % 60).toString().padStart(2, '0')
  const score = 0

  return (
    <div className="game">
      <h2 className="card_count">残り枚数：{cardData.length}</h2>
      <span className="timer">
        タイマー：{minutes}:{secs}
      </span>

      <span className="game_score">
        スコア：{score}
      </span>
      <div className="board">
        {cardData.map((card) => {
          <div className="card" key={card.id}>
            <img src={card.image} alt={`card-${card.id}`} className="card_img" />
          </div>
        })}
      </div>
    </div>
  )
}

export default Game