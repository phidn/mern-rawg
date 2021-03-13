import React, { useState } from 'react'
import GameItem from '../components/GameItem';
import Header from '../components/Header'
import clientParams from "./../utils/clientParams";

export default function Home() {
  const [state, setState] = useState({
    genresActive: 0
  });

  let { genres } = clientParams;
  console.log("~ genres", genres)
  return (
    <div className="page">
      <Header/>
      <div className="page__genres">
        {
          genres.map((item,index) => {
            return <a key={index} 
              className={state.genresActive === index? "genres__item genres__item-active":"genres__item"} 
              href={`game/genres=${item.slug}`}>{item.name}</a>
          })
        }
      </div>
      <div className="genres-content">
        <div className="row">
          <div className="genres-column col-3">
            <GameItem/>
          </div>
          <div className="genres-column col-3">b</div>
          <div className="genres-column col-3">c</div>
          <div className="genres-column col-3">d</div>
        </div>
      </div>
    </div>
  )
}
