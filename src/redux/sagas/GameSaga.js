import { call, put, takeLatest } from "redux-saga/effects";
import { gameService } from "../../services/GameService";
import { FETCH_GAME_GENRES_SAGA, HIDE_LOADING, SET_GAME_GENRES, SHOW_LOADING, STATUS_CODE } from "./../../utils/constants";

// Get task type
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
