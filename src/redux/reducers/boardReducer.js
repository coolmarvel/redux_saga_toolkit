import { createReducer, createAction } from "@reduxjs/toolkit"; // immer가 내장되어있어 불변성을 유지해준다.
// import { createAction } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../sagas/createRequestSaga";
import * as API from "../../api/boardReducerAPI";

// ACTION TYPE
export const SEARCH_DATA = "SEARCH_DATA";
export const [
  SEARCH_DATA_ASYNC,
  SEARCH_DATA_ASYNC_SUCCESS,
  SEARCH_DATA_ASYNC_FAILURE,
] = createRequestActionTypes("SEARCH_DATA_ASYNC");
export const [
  SAVE_DATA_ASYNC,
  SAVE_DATA_ASYNC_SUCCESS,
  SAVE_DATA_ASYNC_FAILURE,
] = "SAVE_DATA_ASYNC";
export const [
  REMOVE_DATA_ASYNC,
  REMOVE_DATA_ASYNC_SUCCESS,
  REMOVE_DATA_ASYNC_FAILURE,
] = "REMOVE_DATA_ASYNC";

// ACTION CREATOR
export const removeDataAsync = createAction(REMOVE_DATA_ASYNC);
export const searchData = createAction(SEARCH_DATA);
export const searchDataAsync = createAction(SEARCH_DATA_ASYNC);
export const saveDataAsync = createAction(SAVE_DATA_ASYNC, (data, lastId) => ({
  payload: {
    data,
    lastId,
  },
}));
// export const searchDataAsync = createAction(SEARCH_DATA_ASYNC, (data) => data);
// export const saveDataAsync = createAction(SAVE_DATA_ASYNC, (data, lastId) => ({
//   data,
//   lastId,
// }));

// INITIAL STATE
const initialState = {
  dashboard: [],
  lastId: 0,
};

// Saga Create
// const searchDataSaga = createRequestSaga(SEARCH_DATA_ASYNC, API.getData);
// const saveDataSaga = createRequestSaga(SAVE_DATA_ASYNC, API.postData);
// const removeDataSaga = createRequestSaga(REMOVE_DATA_ASYNC, API.removeData);

// Search Saga
export function* searchDataSaga() {
  const response = yield call(API.getData);
  yield put(searchData(response));
}

// Save Saga
export function* saveDataSaga({ payload }) {
  const response = yield call(API.postData, payload);
  if (response != null && (response.status == 201 || response.status == 200)) {
    yield put(searchDataAsync());
  }
}

// Remove Saga
export function* removeDataSaga({ payload: id }) {
  const response = yield call(API.removeData, id);
  if (response.status == 200) {
    yield put(searchDataAsync());
  }
}

// MAIN SAGA
export function* boardSaga() {
  yield takeEvery(SEARCH_DATA_ASYNC, searchDataSaga);
  yield takeEvery(SAVE_DATA_ASYNC, saveDataSaga);
  yield takeEvery(REMOVE_DATA_ASYNC, removeDataSaga);
}

// TOOLKIT REDUCER
export default createReducer(initialState, {
  [SEARCH_DATA]: (state, { payload: data }) => {
    state.dashboard.length = 0;
    for (let i = 0; i < data.length; i++) {
      state.dashboard.push({
        id: data[i].id,
        blocks: data[i].blocks,
        transactions: data[i].transactions,
      });
      if (i === data.length - 1) {
        state.lastId = data[i].id;
      }
    }
  },
  [SEARCH_DATA_ASYNC_SUCCESS]: (state, { payload: data }) => {
    state.dashboard.length = 0;
    for (let i = 0; i < data.length; i++) {
      state.dashboard.push({
        id: data[i].id,
        blocks: data[i].blocks,
        transactions: data[i].transactions,
      });
      if (i === data.length - 1) {
        state.lastId = data[i].id;
      }
    }
  },
  [SEARCH_DATA_ASYNC_FAILURE]: (state, { payload: data }) => {
    alert("Error!");
  },
});
