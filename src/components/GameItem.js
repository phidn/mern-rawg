import React, { useEffect } from 'react'
import { getPlatformIcon } from '../utils/clientHelper'
import { BsFillPlayFill } from "react-icons/bs"
import { AiFillLike, AiOutlineYoutube } from "react-icons/ai"
import $ from "jquery";
import _ from "lodash";
// import VideoGame from './VideoGame';

export default function GameItem(props) {
  let backgroundImage = props.gameInfo.background_image;
  let titleName = props.gameInfo.name;
  let score = props.gameInfo.metacritic;
  let srcVideo = "";
  
  const handleMouseEnter = (event) => {
    let image = $(event.target).parents(".game-item").find(".game-item__img__top");
    let video = $(event.target).parents(".game-item").find("video");
    let playButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>svg");
    let fullVideoButton = $(event.target).parents(".game-item").find(".game-item__btn__bottom>span");

    image.css("display","none");
    playButton.css("opacity","0");
    fullVideoButton.css("opacity","0.7");
    video.trigger("play");

    // let srcVideo = video.attr("src");
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
    // image.css("opacity","0.5");
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

  // console.log("~ arrSlugRender", arrSlugRender)
  // console.log(platformsRender, platformsRender());

  return (
    <div 
      className="game-item" 
      onMouseEnter={
        srcVideo.length>0? handleMouseEnter: () => {}
      }
      onMouseLeave={
        srcVideo.length>0? handleMouseLeave: () => {}
      }
    >
      <div className="game-item__card__top">
        {
          srcVideo.length>0? (
            <video src="" loop muted></video>
          ): ""
        }
        <div className="game-item__img__top" style={{backgroundImage:`url('${backgroundImage}')`}}></div>
        <div className="game-item__btn__bottom">
          <BsFillPlayFill/>
          <span>
            <AiOutlineYoutube/> Full Video
          </span>
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
