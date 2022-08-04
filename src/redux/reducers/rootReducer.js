import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loadingReducer from "./loadingReducer";
import boardReducer, { boardSaga } from "./boardReducer";

const rootReducer = combineReducers({
  boardReducer,
  loadingReducer,
});

export function* rootSaga() {
  yield all([boardSaga()]);
}

export default rootReducer;
