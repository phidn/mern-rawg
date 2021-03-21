import React, { useState } from 'react'
import { getPlatformIcon } from '../utils/clientHelper'
import { BsFillPlayFill } from "react-icons/bs"
import { AiFillLike, AiOutlineYoutube } from "react-icons/ai"
import $ from "jquery";
import _ from "lodash";
import GameItemImage from './GameItemImage';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { SET_SRC_MODAL_GAME, TOGGLE_LIKE_GAME_SAGA } from '../utils/constants';

function GameItem(props) {
  const dispatch = useDispatch();
  let backgroundImage = props.gameInfo?.background_image;
  let { id, isLike, name, metacritic } = props.gameInfo;

  let srcVideo = props.gameInfo?.clip?.clips["640"];
  let srcVideoYoutube = props.gameInfo?.clip?.video;

  const [showVideo, setShowVideo] = useState(false);
  const [likeGame, setLikeGame] = useState(isLike);
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = (event) => {
    if(!showVideo) {
      setShowVideo(true);
    }
    setLoading(true);

    let image = $(event.target).parents(".game-item").find(".game-item__img__top");
    let playButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>svg");
    let fullVideoButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>button");

    image.css("display","none");
    playButton.css("opacity","0");
    fullVideoButton.css("opacity","0.7");
  }

  const handleMouseLeave = (event) => {
    let image = $(event.target).parents(".game-item").find(".game-item__img__top");
    let playButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>svg");
    let fullVideoButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>button");

    image.css("display","block");
    playButton.css("opacity","1");
    fullVideoButton.css("opacity","0");
    setLoading(false);
    setShowVideo(false);
  }

  const handleLoadedDataVideo = (event) => {
    setLoading(false);
    $(event.target).trigger("play");
  }

  let platforms = props.gameInfo.platforms;
  let getSlugsRender = () => {
    let platformKey = [ "pc", "playstation", "xbox", "ios", "android", "linux", "macos" ];
    let arrSlugPlatform = platforms.map(({platform}, index) => {
      let slugPlatform = platformKey.find(item => platform.slug.includes(item));
      if(slugPlatform) {
        return slugPlatform;
      }
    });
    return _.without(_.uniq(arrSlugPlatform), undefined);
  }

  let arrSlugRender = getSlugsRender();

  const handleLikeGame = (id) => {
    dispatch({ 
      type: TOGGLE_LIKE_GAME_SAGA,
      gameId: id
    });
    setLikeGame(!likeGame);
  }

  return (
    <div 
      className="game-item" 
      onMouseEnter={ !!srcVideo? handleMouseEnter: () => {} }
      onMouseLeave={ !!srcVideo? handleMouseLeave: () => {} }
    >
      <div className="game-item__card__top">
        { loading && <Loading/> }
        {
          !!srcVideo && showVideo && (
            <video 
              src={srcVideo} loop muted
              onLoadedData={ handleLoadedDataVideo }
            ></video>
          )
        }
        <GameItemImage backgroundImage={backgroundImage} hasVideo={showVideo} />
        {
          !!srcVideoYoutube && (
            <div className="game-item__btn__bottom">
              <BsFillPlayFill/>
              <button onClick={() => {
                dispatch({
                  type: SET_SRC_MODAL_GAME,
                  srcId: srcVideoYoutube
                });
              }}><AiOutlineYoutube/>Full Video</button>
            </div>
          )
        }

      </div>
      <div className="game-item__info">
        <div className="game-item__info__detail">
          <div className="game-item__info__detail__platforms">
            {
              arrSlugRender?.map((slug, index) => {
                let PlatFormIcon = getPlatformIcon(slug);
                return PlatFormIcon? <PlatFormIcon key={index}/>: null;
              })
            }
          </div>
          <div className="game-item__info__detail__metascore">
            <span style={{ color:"#6dc849", border: "1px solid rgba(109,200,73,.4)"}}>{metacritic||""}</span>
          </div>
        </div>
        <div className="game-item__info__title">
          <span href="#/">{ name }</span>
          {
            !!id && (
              <div onClick={ () => handleLikeGame(id) } className="game-item__info__title-react">
              {
                likeGame? <AiFillLike style={{color:"blueviolet"}}/>: <AiFillLike/>
              }
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default React.memo(GameItem);
