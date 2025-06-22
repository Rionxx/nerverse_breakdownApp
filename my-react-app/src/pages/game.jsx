import { React, useState, useEffect, startTransition } from "react";
import '../index.css'

function Game() {
  const [time, setTime] = useState(0)
  const cardData = [
    '../images/card1.jpeg',
    '../images/romaco2.png',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
    '../images/card1.jpeg',
  ]

  const handleAddItems = () => {
    //非同期で重い状態更新をラップ
    startTransition(() => {
      const newItems = Array(1000).fill(0).map((_, i) => i)
      setItems(newItems)
      // ここにアイテムを追加するロジックを記述
      console.log("アイテムが追加されました");
    })
  }

  //1秒ごとの時間を更新する
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
        {cardData.map((src, index) => {
          return (
            <div className="card" key={index}>
            <img src={src} alt={`card-${index}`} className="card_img" />
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Game