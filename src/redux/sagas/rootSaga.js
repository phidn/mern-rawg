import { all } from "redux-saga/effects";
import * as Game from "./GameSaga";

export function * rootSaga() {
  yield all([
    Game.watchFetchGameGenresSaga(),
    Game.watchFetchGameKeywordSaga(),
    Game.watchToggleLikeGameSaga(),
    Game.watchFetchGameUserLikeSaga(),
  ]);
}
