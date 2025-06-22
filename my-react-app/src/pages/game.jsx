import React, { useState, useEffect, startTransition } from "react";
import '../index.css'

const cardData = [
    'card1.jpeg',
    'card2.jpeg',
    'card3.jpeg',
    'card4.jpeg',
    'card5.jpeg',
    'card6.jpeg',
]

/**
* シャッフル関数
* @param {Array} array
* @returns {Array}
*/
const shuffle = (array) => {
  const copied = [...array]
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copied[i], copied[j]] = [copied[j], copied[i]]
  }
  return copied
}

function Game() {
  /**
   * Generate the initial state of the cards
   * @returns {Array<{src: string, flipped: boolean}>}
   * @description
   *   - The initial state should be a shuffled list of card objects
   *   - The list should contain 2 of each card image
   *   - The card object should have a src property that points to the image location
   *   - The card object should have a flipped property that is set to false
   */
  const initCards = () => {
    const doubled = cardData.flatMap((image) => [
      {src: `/images/${image}`, flipped: false, matched: false},
      {src: `/images/${image}`, flipped: false, matched: false}
    ])
    return shuffle(doubled)
  }

  const [time, setTime] = useState(0)
  const [cards, setCards] = useState(initCards)
  const [flippedIndexes, setFlippedIndexes] = useState([])
  //const [showhCoutns, setShownCounts] = useState({})

  //ランダムに画像を1つ返す関数
  // const getRandomImage = () => {
  //   //画像の表示カウントを取得し、2枚以上は同じ画像を表示させない
  //   const available = cardData.filter(
  //     (image) => (showhCoutns[image] || 0) < 2
  //   )
  //   if (available.length === 0) return null
  //   const chosen = available[Math.floor(Math.random() * available.length)]
  //   return chosen
  // }

  // //カードクリック時の処理
  // const handleCardClick = (index) => {
  //   setCards((prevCards) => {
  //     if (prevCards[index].flipped) return prevCards //既にめくれているカードは無視

  //     const image = getRandomImage()
  //     if (!image) return prevCards // 画像が取得できない場合は何もしない

  //     const newCards = [...prevCards]
  //     newCards[index] = {
  //       flipped: true,
  //       src: `/images/${image}`
  //     }
  //     setShownCounts((prev) => ({
  //       ...prev,
  //       [image]: (prev[image] || 0) + 1
  //     }))
  //     return newCards
  //   })
  // }

  const handleCardClick = (index) => {
    if (cards[index].flipped || flippedIndexes.length === 2) return //既にめくれているカードは無視

    const newCards = [...cards]
    newCards[index].flipped = true //カードをめくる
    const newFlipped = [...flippedIndexes, index]

    setCards(newCards)
    setFlippedIndexes(newFlipped)

    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped
      if (newCards[i1].src === newCards[i2].src) {
        setTimeout(() => {
          const updated = [...newCards]
          updated[i1].matched = true
          updated[i2].matched = true
          setCards(updated)
          setFlippedIndexes([])
        }, 800)
      } else {
        setTimeout(() => {
          newCards[i1].matched = false
          newCards[i2].matched = false
          setCards([...newCards])
          setFlippedIndexes([])
        }, 1000)
      }
    }
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
            <img src={card.flipped  || card.matched ? card.src : "/images/card0.jpeg"} 
            alt={`card-${index}`} 
            className="card_img" />
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Game