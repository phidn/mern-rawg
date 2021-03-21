import { call, put, takeLatest } from "redux-saga/effects";
import { gameService } from "../../services/GameService";
import { FETCH_GAME_GENRES_SAGA, FETCH_GAME_KEYWORD_SAGA, HIDE_LOADING, SET_GAME_GENRES, SHOW_LOADING, STATUS_CODE, SET_GAME_KEYWORD, TOGGLE_LIKE_GAME_SAGA, FETCH_GAME_USER_LIKED_SAGA, SET_GAME_LIKED } from "./../../utils/constants";

function * fetchGameGenresSaga(action) {
  try {
    if(action.pageNumber === 1) {
      yield put({ type: SHOW_LOADING});
    }

    const {data, status} = yield call(() => {
      return gameService.fetchGameGenres(action.slug, action.pageNumber);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_GAME_GENRES,
        data: {
          games: data.results,
          nextUrl: data.next
        }
      });
    }

    yield put({ type: HIDE_LOADING });
  } catch (error) {
    console.log("~ error", error.response?.data);
  }
}

export function * watchFetchGameGenresSaga() {
  yield takeLatest(FETCH_GAME_GENRES_SAGA, fetchGameGenresSaga);
}


function * fetchGameKeywordSaga(action) {
  try {
    if(action.pageNumber === 1) {
      yield put({ type: SHOW_LOADING});
    }

    const {data, status} = yield call(() => {
      return gameService.fetchGameKeyword(action.keyword);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_GAME_KEYWORD,
        gameKeyword: data.results
      });
    }

    yield put({ type: HIDE_LOADING });
  } catch (error) {
    console.log("~ error", error.response?.data);
  }
}

export function * watchFetchGameKeywordSaga() {
  yield takeLatest(FETCH_GAME_KEYWORD_SAGA, fetchGameKeywordSaga);
}

function * toggleLikeGameSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return gameService.toggleLikeGame(action.gameId);
    });

    if(status === STATUS_CODE.SUCCESS) {
      // yield put({
      //   type: SET_GAME_KEYWORD,
      //   gameKeyword: data.results
      // });
    }

    yield put({ type: HIDE_LOADING });
  } catch (error) {
    console.log("~ error", error.response?.data);
  }
}

export function * watchToggleLikeGameSaga() {
  yield takeLatest(TOGGLE_LIKE_GAME_SAGA, toggleLikeGameSaga);
}

function * fetchGameUserLikedSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return gameService.fetchGameLiked();
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_GAME_LIKED,
        gameLiked: data.data.video
      });
    }

  } catch (error) {
    console.log("~ error", error.response?.data);
  }
}

export function * watchFetchGameUserLikeSaga() {
  yield takeLatest(FETCH_GAME_USER_LIKED_SAGA, fetchGameUserLikedSaga);
}
