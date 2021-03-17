import React, { useEffect, useState } from 'react'
import GameItem from '../components/GameItem';
import Header from '../components/Header'
import clientParams from "./../utils/clientParams";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_GAME_GENRES_SAGA } from '../utils/constants';
import { isMobile, isTablet, isDesktop } from "react-device-detect";
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import GameItemModal from '../components/GameItemModal';

const getColumnNumber = () => {
  if(isMobile) return 1;
  if(isTablet) return 2;
  if(isDesktop) return 4;
}

export default function Home(props) {
  let { genres } = clientParams;  
  let columnNumber = getColumnNumber();
  let slugParamGenres = props.match.params.genres || "action";
  
  const [state, setState] = useState({
    nextPage: 1,
    gamesRender: [],
  });
  
  const {games, nextPageNumber} = useSelector(state => state.GameReducer);
  const loading = useSelector(state => state.AppReducer.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!!slugParamGenres) {
      dispatch({
        type: FETCH_GAME_GENRES_SAGA,
        slug: slugParamGenres,
        pageNumber: state.nextPage,
      });
    };
  },[slugParamGenres, state.nextPage]);

  useEffect(() => {
    if(!!games) {
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
      setState((state) => {
        if(!state.gamesRender.length) {
          return { ...state, gamesRender: [ gamesResult ] }
        } else {
          return { 
            ...state, 
            gamesRender: [ ...state.gamesRender, gamesResult ]
          }
        }
      });
    }
  }, [columnNumber, games]);

  // call everytime component did update
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setState(state => ({
          ...state,
          nextPage: nextPageNumber
        }))
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });


  return (
    <div className="page">
      { loading && <Loading/> }
      <Header/>
      <div className="page__genres">
        {
          genres.map((item,index) => {
            return <NavLink
              key={index} 
              className= {
                item.slug === slugParamGenres? "genres__item genres__item-active": "genres__item"
              } 
              to={`/games/${item.slug}`}
              >{item.name}</NavLink>
          })
        }
      </div>
      <div className="genres-content" style={{ opacity: `${loading? 0: 1}` }}>
        <GameItemModal/>
        <div className="row pe-0 me-0">
          {
            [...Array(columnNumber).keys()].map((index) => {
              return <div key={index} className="genres-column col-3">
                {
                  state.gamesRender?.map(page => {
                    return page.map((column, indexColum) => {
                      if(indexColum===index) {
                        return column.map(game => {
                          return <GameItem key={game.id} gameInfo={game} />
                        })
                      }
                    })
                  })
                }
              </div>
            })
          }
        </div>
        <div className="row genres__content__loading pe-0 me-0">
          { !loading && <Loading/> }
        </div>
      </div>
    </div>
  )
}
