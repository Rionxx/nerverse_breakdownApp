import React, { useState, useEffect, startTransition } from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
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

  //カードの初期状態を生成する関数
  const initCards = () => {
    //カードの画像を2枚ずつ生成し、シャッフルする
    const doubled = cardData.flatMap((image) => [
      {src: `/images/${image}`, flipped: false, matched: false},
      {src: `/images/${image}`, flipped: false, matched: false}
    ])
    return shuffle(doubled)
  }

  const [time, setTime] = useState(0)
  const [cards, setCards] = useState(initCards)
  const [flippedIndexes, setFlippedIndexes] = useState([])
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const bgm = new Audio('/sounds/game_sound.mp3')
  const isMatchedSound = new Audio('/sounds/matched_sound.mp3')
  const notMatchedSound = new Audio('/sounds/notmatched_sound.mp3')
  const navigate = useNavigate()

  const redirect = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // ゲーム開始時：isRunningをtrueにする
  useEffect(() => {
    setCards(initCards());
    setIsRunning(true);

    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.play().catch((error) => {
      console.error("BGMの再生に失敗しました:", error);
    });

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);

  // ゲームクリア判定
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setIsRunning(false); // ゲームが終了したらタイマーを停止
      const totalSeconds = time;
      const penaltyByMiss = missCount * 50;
      const penaltyByTime = time * 20;
      const calculatedScore = Math.max(5000 - penaltyByMiss - penaltyByTime, 0);
      setFinalTime(totalSeconds);
      setScore(calculatedScore);
      setShowScore(true); // タイマーを停止
    }
  }, [cards, time]);

  // クリック時のアクション
  const handleCardClick = (index) => {
    if (cards[index].flipped || flippedIndexes.length === 2) return; //既にめくれているカードは無視

    const newCards = [...cards];
    newCards[index].flipped = true; //カードをめくる
    const newFlipped = [...flippedIndexes, index];

    setCards(newCards);
    setFlippedIndexes(newFlipped);
    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      //カードが一致するか確認
      if (newCards[i1].src === newCards[i2].src) {
        isMatchedSound.currentTime = 0; // 音声をリセット
        isMatchedSound.volume = 0.8;
        setTimeout(() => {
          isMatchedSound.play();
          const updated = [...newCards];
          updated[i1].matched = true;
          updated[i2].matched = true;
          setCards(updated);
          setFlippedIndexes([]);
        }, 800);
      //カードが一致しない場合は、1秒後にカードを戻す
      } else {
        notMatchedSound.currentTime = 0; // 音声をリセット
        notMatchedSound.volume = 0.8;
        setTimeout(() => {
          notMatchedSound.play();
          const updated = [...newCards];
          updated[i1].flipped = false;
          updated[i2].flipped = false;
          setCards(updated);
          setFlippedIndexes([]); 
          setMissCount((prev) => prev + 1);
          setScore((prev) => Math.max(prev - 50 * missCount, 0));
          console.log(`外した回数: ${missCount + 1} 回`);
        }, 1000);
      }
    }
  }

  const handleAddItems = () => {
    //非同期で重い状態更新をラップ
    startTransition(() => {
      const newItems = Array(1000).fill(0).map((_, i) => i);
      setItems(newItems);
      // ここにアイテムを追加するロジックを記述
      console.log("アイテムが追加されました");
    })
  }

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const secs = (time % 60).toString().padStart(2, '0');
  

  return (
    <div className="game">
      <h2 className="card_count">残り枚数：{cards.filter((card) => !card.matched).length  }</h2>
      <span className="timer">
        タイマー：{minutes}:{secs}
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

      {showScore && (
        <div className="score-overlay">
          <div className="score-modal">
            <h2>ゲームクリア！</h2>
            <p>タイム：{finalTime} 秒</p>
            <p>スコア：{score} 点</p>
            <p>外した回数：{missCount} 回</p>
            <button onClick={() => window.location.reload()}>もう一度プレイ</button>
            <button onClick={redirect}>
              ホームへ戻る
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Game