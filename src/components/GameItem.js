import React from 'react'
import { getPlatformIcon } from '../utils/clientHelper'
import { AiFillLike } from "react-icons/ai"

const PlatFormIcon = getPlatformIcon("pc");

export default function GameItem(props) {
  return (
    <div className="game-item">
      <div className="game-item__img__top" style={{backgroundImage:"url('https://media.rawg.io/media/crop/600/400/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg')"}}></div>
      <div className="game-item__info">
        <div className="game-item__info__detail">
          <div className="game-item__info__detail__platforms">
            <PlatFormIcon/>
            <PlatFormIcon/>
            <PlatFormIcon/>
          </div>
          <div className="game-item__info__detail__metascore">
            <span style={{ color:"#6dc849", border: "1px solid rgba(109,200,73,.4)"}}>97</span>
          </div>
        </div>
        <div className="game-item__info__title">
          <div>Grand Theft Auto V</div>
          <div className="game-item__info__title-react">
            <AiFillLike/>
          </div>
        </div>
      </div>
    </div>
  )
}
