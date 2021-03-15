import React, { useEffect, useState } from 'react'
import { getPlatformIcon, elementInViewport } from '../utils/clientHelper'
import { BsFillPlayFill } from "react-icons/bs"
import { AiFillLike, AiOutlineYoutube } from "react-icons/ai"
import $ from "jquery";
import _ from "lodash";
import GameItemImage from './GameItemImage';
// import VideoGame from './VideoGame';

function GameItem(props) {
  // console.log("~ props", props.gameInfo);
  let backgroundImage = props.gameInfo.background_image;
  let titleName = props.gameInfo.name;
  let score = props.gameInfo.metacritic;
  let srcVideo = props.gameInfo.clip.clips["640"];
  const [showVideo, setShowVideo] = useState(false);
  
  const handleMouseEnter = (event) => {
    if(!showVideo) {
      setShowVideo(true);
    }

    let image = $(event.target).parents(".game-item").find(".game-item__img__top");
    let video = $(event.target).parents(".game-item").find("video");
    let playButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>svg");
    let fullVideoButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>span");

    image.css("display","none");
    playButton.css("opacity","0");
    fullVideoButton.css("opacity","0.7");
    video.trigger("play");
  }

  const handleMouseLeave = (event) => {
    let video = $(event.target).parents(".game-item").find("video");
    let image = $(event.target).parents(".game-item").find(".game-item__img__top");
    let playButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>svg");
    let fullVideoButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>span");

    video.get(0).currentTime = 0;
    video.trigger("pause");
    image.css("display","block");
    playButton.css("opacity","1");
    fullVideoButton.css("opacity","0");
  }

  let platforms = props.gameInfo.platforms;
  let getSlugsRender = () => {
    let platformKey = [ "pc", "playstation", "xbox", "ios", "android", "linux" ]
    let arrSlugPlatform = platforms.map(({platform}, index) => {
      let slugPlatform = platformKey.find(item => platform.slug.includes(item));
      if(slugPlatform) {
        return slugPlatform;
      }
    });
    return _.uniq(arrSlugPlatform);
  }

  let arrSlugRender = getSlugsRender();

  return (
    <div 
      className="game-item" 
      onMouseEnter={ !!srcVideo? handleMouseEnter: () => {} }
      onMouseLeave={ !!srcVideo? handleMouseLeave: () => {} }
    >
      <div className="game-item__card__top">
        {
          showVideo && (
            <video 
              src={srcVideo} loop muted
              onLoadedData={(event) => $(event.target).trigger("play")}
            ></video>
          )
        }
        <GameItemImage backgroundImage={backgroundImage} hasVideo={showVideo} />
        <div className="game-item__btn__bottom">
          <BsFillPlayFill/>
          <span> <AiOutlineYoutube/>Full Video</span>
        </div>
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
            <span style={{ color:"#6dc849", border: "1px solid rgba(109,200,73,.4)"}}>{score||""}</span>
          </div>
        </div>
        <div className="game-item__info__title">
          <a href="#/">{ titleName }</a>
          <div className="game-item__info__title-react">
            <AiFillLike/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(GameItem);
