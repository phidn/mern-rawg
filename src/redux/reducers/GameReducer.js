import { SET_GAME_GENRES } from "./../../utils/constants";

const initialState = {
  games: [],
  nextPageNumber: null
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
  }
  return {...state}
}
/* eslint-enable */
