import React, { useEffect, useState } from 'react'
import GameItem from '../components/GameItem';
import Header from '../components/Header'
import clientParams from "./../utils/clientParams";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_GAME_GENRES_SAGA } from '../utils/constants';
import { isMobile, isTablet, isDesktop } from "react-device-detect";

const getColumnNumber = () => {
  if(isMobile) return 1;
  if(isTablet) return 2;
  if(isDesktop) return 4;
}

export default function Home(props) {
  let slugParam = props.match.params.genres || "action";
  let columnNumber = getColumnNumber();

  const [state, setState] = useState({
    currentGenres: {
      slug: slugParam,
      page: 1
    },
    gamesRender: []
  });
  
  console.log("~ gamesRender", state.gamesRender);
  
  const {games, nextPageNumber} = useSelector(state => state.GameReducer);
  // console.log("~ games", games);
  // console.log("~ nextPageNumber", nextPageNumber);

  let { slug } = state.currentGenres;
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(slug.length>0) {
      dispatch({
        type: FETCH_GAME_GENRES_SAGA,
        slug: state.currentGenres.slug,
        pageNumber: state.currentGenres.page,
      });
    };
  },[slug]);

  useEffect(() => {
    let gamesResult = [];
    for (let i = 0; i < columnNumber; i++) {
      gamesResult[i] = [];
      for (let j = 0; j < games.length; j++) {
        let resetIndex = j - i;
        if( resetIndex % columnNumber === 0) {
          gamesResult[i].push(games[j])
        }
      }
    }
    setState((state) => ({
      ...state,
      gamesRender: gamesResult
    }))
  }, [columnNumber, games]);

  let { genres } = clientParams;
  
  return (
    <div className="page">
      <Header/>
      <div className="page__genres">
        {
          genres.map((item,index) => {
            return <a key={index} 
              className={
                item.slug === slugParam? "genres__item genres__item-active": "genres__item"
              } 
              href={`/games/${item.slug}`}>{item.name}</a>
          })
        }
      </div>
      <div className="genres-content">
        <div className="row pe-0 me-0">
          {
            state.gamesRender?.map((column, indexColum) => {
              return <div key={indexColum} className="genres-column col-3">
                {
                  column.map((game) => {
                    return <GameItem key={game.id} gameInfo={game} />
                  })
                }
              </div>
            })
          }
          {/* <div className="genres-column col-3">
            <GameItem/>
            <GameItem/>
          </div>
          <div className="genres-column col-3">
            <GameItem/>
          </div>
          <div className="genres-column col-3">
            <GameItem/>
          </div>
          <div className="genres-column col-3">
            <GameItem/>
          </div> */}
        </div>
      </div>
    </div>
  )
}
