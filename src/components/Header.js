import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./../styles/Header.css";
import { getPlatformIcon } from '../utils/clientHelper'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_GAME_KEYWORD_SAGA, SET_CURRENT_USER } from '../utils/constants';
import _ from "lodash";
import AppContext from "./AppContext";
import { IoIosLogOut } from 'react-icons/io';


export default function Header() {
  const wrapperRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [stateInput, setStateInput] = useState("");
  const keywordRef = useRef(null);
  const dispatch = useDispatch();

  function openDropdown() {
    setVisible(true);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);  
 
  function handleChange(event) {
    let { value } = event.target;
    setStateInput(value);
    if(keywordRef.current) {
      clearTimeout(keywordRef.current);
    }                
    keywordRef.current = setTimeout(() => {
      dispatch({
        type: FETCH_GAME_KEYWORD_SAGA,
        keyword: value
      });
    }, 300);
  }

  const gameKeyword = useSelector(state => state.GameReducer.gameKeyword);
  
  const resizeImage = (imageSrc) => {
    // console.log("~ imageSrc", imageSrc);
    return imageSrc.includes("https://media.rawg.io/media/screenshots")
      ? imageSrc.replace(
        "https://media.rawg.io/media/screenshots",
        "https://media.rawg.io/media/resize/420/-/screenshots"
      )
      : imageSrc;
  }

  const convertPlatforms = (arrPlatforms) => {
    let platformKey = [ "pc", "playstation", "xbox", "ios", "android", "linux", "macos" ];
    let result = arrPlatforms.map(platform => {
      let index = platformKey.findIndex(slug => platform.platform.slug.includes(slug));
      if(index !== -1) {
        return platformKey[index];
      }
    });
    return _.without(_.uniq(result), undefined);
  }

  const renderPlatforms = (arrPlatforms) => {
    let platformsResult = convertPlatforms(arrPlatforms);
    return platformsResult.map((item,index) => {
      let Icon = getPlatformIcon(item);
      return <Icon key={index}/>;
    })
  }

  const user = useContext(AppContext).state.user;  
  const signOut = () => {
    localStorage.removeItem("awesome_twitter_token");
    dispatch({type: SET_CURRENT_USER, payload: null});
  }

  return (
    <header className="header">
      <div className="header__item">
        <NavLink to="/" className="header__item-logo">RAWG</NavLink>
      </div>
      <div className="header__item header__form-search">
        <div className="form-search__input">
          <i className="fa fa-search"></i>
          <input
            ref={wrapperRef}
            onChange={handleChange} 
            onClick={openDropdown} 
            name="input-search-game" 
            value={stateInput} 
            type="text"
            placeholder="Search 520.198 games"
          />
          
          { visible && !!gameKeyword.length && (
            <div className="form-search__result">
              {
                gameKeyword.map((game,index) => {
                  return !!game.background_image && (
                  <div key={index} className="result-item">
                    <div className="result-item__media">
                      <img src={resizeImage(game.background_image)} alt={game.name}/>
                    </div>
                    <div className="result-item__info">
                      <div className="result-item__info__platforms">
                        {renderPlatforms(game.platforms)}
                      </div>
                      <div className="result-item__info__title">
                        {game.name}
                      </div>
                    </div>
                  </div>
                  )          
                })
              }
            </div>
          )}
      </div>          
        </div>
      <div className="header__item">
        {
          user? <>
            <NavLink to={`/profile/@${user.userName}`} className="header__item-profile ms-2">
              <img src={`https://ui-avatars.com/api/name=${user.userName}?size=45&rounded=true&length=1&background=random`} alt="avatar" />
              <span className="ms-2">{user.userName}</span>
            </NavLink>
            <span className="header__logout"><IoIosLogOut onClick={() => signOut()}/></span>
          </>: <>
            <NavLink to="/login" className="header__item-link">Login</NavLink>
            <NavLink to="/signup" className="header__item-link">Sign up</NavLink> 
          </>
        }
      </div>
    </header>
  )
}
