import { SHOW_LOADING, HIDE_LOADING, SET_CURRENT_USER } from "./../../utils/constants";

const initialState = {
  loading: false
}

/* eslint-disable */
export default (state = initialState, action) => {
  switch(action.type) {
    case SHOW_LOADING: {
      state.loading = true;
    }; break;
    case HIDE_LOADING: {
      state.loading = false;
    }; break;
    case SET_CURRENT_USER: {
      state.user = action.payload; 
    }
  }
  return {...state};
}
