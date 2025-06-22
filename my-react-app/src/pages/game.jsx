import { React, useState, useEffect, startTransition } from "react";
import '../index.css'

const cardData = [
    'card1.jpeg',
    'card2.jpeg',
    'card3.jpeg',
    'card4.jpeg',
    'card5.jpeg',
    'card6.jpeg',
]

function Game() {
  const [time, setTime] = useState(0)
  const [cards, setCards] = useState(Array.from({ length: 12}, (_, i)=> i + 1).map(() => ({ flipped: false, src: '/images/card0.jpeg' })))
  const [showhCoutns, setShownCounts] = useState({})

  //ランダムに画像を1つ返す関数
  const getRandomImage = () => {
    //画像の表示カウントを取得し、2枚以上は同じ画像を表示させない
    const available = cardData.filter(
      (image) => (showhCoutns[image] || 0) < 2
    )
    if (available.length === 0) return null
    const chosen = available[Math.floor(Math.random() * available.length)]
    return chosen
  }

  //カードクリック時の処理
  const handleCardClick = (index) => {
    setCards((prevCards) => {
      if (prevCards[index].flipped) return prevCards //既にめくれているカードは無視

      const image = getRandomImage()
      if (!image) return prevCards // 画像が取得できない場合は何もしない

      const newCards = [...prevCards]
      newCards[index] = {
        flipped: true,
        src: `/images/${image}`
      }
      setShownCounts((prev) => ({
        ...prev,
        [image]: (prev[image] || 0) + 1
      }))
      return newCards
    })
  }

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
      <h2 className="card_count">残り枚数：{cards.length}</h2>
      <span className="timer">
        タイマー：{minutes}:{secs}
      </span>

      <span className="game_score">
        スコア：{score}
      </span>
      <div className="board">
        {cards.map((card, index) => {
          return (
            <div className="card" key={index} onClick={() => handleCardClick(index)}>
            <img src={card.src} alt={`card-${index}`} className="card_img" />
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Game