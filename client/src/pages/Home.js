import React, { useContext, useEffect, useState } from 'react';
import "./../styles/Home.css";
import GameItem from '../components/GameItem';
import Header from '../components/Header'
import clientParams from "./../utils/clientParams";
import { getColumnNumber } from "./../utils/clientHelper";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_GAME_GENRES_SAGA, FETCH_GAME_USER_LIKED_SAGA } from '../utils/constants';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import GameItemModal from '../components/GameItemModal';
import AppContext from '../components/AppContext';

function Home(props) {
  const user = useContext(AppContext).state.user;
  
  let { genres } = clientParams;  

  let slugParamGenres = props.match.params.genres || "action";
  
  const [state, setState] = useState({
    nextPage: 1,
    gamesRender: []
  });
  
  const {games, nextPageNumber} = useSelector(state => state.GameReducer);
  const loading = useSelector(state => state.AppReducer.loading);

  const dispatch = useDispatch();

  const [columnNumber, setColumnNumber] = useState(getColumnNumber());
  useEffect(() => {
    window.onresize = () => {
      setColumnNumber(getColumnNumber());
    };
    if(!!user) {
      dispatch({
        type: FETCH_GAME_USER_LIKED_SAGA
      });
    }
  }, [dispatch, user]);

  const gameLiked = useSelector(state => state.GameReducer.gameLiked);

  useEffect(() => {
    // reset state when slug param changed!
    setState({
      nextPage: 1,
      gamesRender: []
    })
  }, [slugParamGenres]);

  useEffect(() => {
    if(!!slugParamGenres) {
      dispatch({
        type: FETCH_GAME_GENRES_SAGA,
        slug: slugParamGenres,
        pageNumber: state.nextPage || 1,
      });
    };
  },[slugParamGenres, state.nextPage, dispatch]);

  useEffect(() => {
    if(!!games && !!columnNumber) {
      let gamesResult = [];
      for (let i = 0; i < columnNumber; i++) {
        gamesResult[i] = [];
        for (let j = 0; j < games.length; j++) {
          let resetIndex = j - i;
          if( resetIndex % columnNumber === 0) {
            let index = gameLiked.findIndex(item => item.rawgVideoId == games[j].id)
            if(index !== -1) { 
              games[j].isLike = true 
            }
            gamesResult[i].push(games[j]);
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
  }, [games, columnNumber, gameLiked]);

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
        <div className="dropdown">
          <button className="dropdown-toggle show" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            Select Genres
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            {
            genres.map((item,index) => {
              return <li key={index}>
                <NavLink             
                  className= {
                    item.slug === slugParamGenres? "dropdown-item": "dropdown-item"
                  } 
                  to={`/games/${item.slug}`}
                >{item.name}</NavLink>
              </li>
            })
          }
          </ul>
        </div>
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
              return <div key={index} className={`genres-column col-${12/columnNumber}`}>
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

export default React.memo(Home);