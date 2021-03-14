import { call, put, takeLatest } from "redux-saga/effects";
import { gameService } from "../../services/GameService";
import { FETCH_GAME_GENRES_SAGA, SET_GAME_GENRES, STATUS_CODE } from "./../../utils/constants";

// Get task type
function * fetchGameGenresSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return gameService.fetchGameGenres(action.slug, action.pageNumber);
    });

    console.log("~ status", status)
    console.log("~ data", data)

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_GAME_GENRES,
        data: {
          games: data.results,
          nextUrl: data.next
        }
      });
    }

  } catch (error) {
    console.log("~ error", error.response?.data);
  }
}

export function * watchFetchGameGenresSaga() {
  yield takeLatest(FETCH_GAME_GENRES_SAGA, fetchGameGenresSaga);
}
