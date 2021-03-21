import { SET_GAME_GENRES, SET_SRC_MODAL_GAME, SET_MODAL_GAME, SET_GAME_KEYWORD, SET_GAME_LIKED } from "./../../utils/constants";

const initialState = {
  games: [],
  videoGameRender: [],
  videoGameRenderNumber: 8,
  nextPageNumber: null,
  modalGameItem: {
    modal: null,
    srcId: null,
    showModal: false
  },
  gameKeyword: [],
  gameLiked: []
}

/* eslint-disable */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_GENRES: {
      state.games = action.data.games;
      
      if(action.data.nextUrl.length>0) {
        let url = new URL(action.data.nextUrl);
        let number = url.searchParams.get("page");
        state.nextPageNumber = number;
      }
    }; break;

    case SET_MODAL_GAME: {
      state.modalGameItem.modal = action.modal;
    }; break;

    case SET_SRC_MODAL_GAME: {
      state.modalGameItem.srcId = action.srcId;
    }; break;

    case SET_GAME_KEYWORD: {
      state.gameKeyword = action.gameKeyword;
    }; break;
   
    case SET_GAME_LIKED: {
      state.gameLiked = action.gameLiked;
    }; break;
  }
  
  return {...state}
}
/* eslint-enable */
