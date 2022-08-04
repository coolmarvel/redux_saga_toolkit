import { createReducer } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import createRequestSaga from "../sagas/createRequestSaga";
import * as API from "../../api/api";
import {
  SEARCH_DATA,
  SEARCH_DATA_ASYNC,
  SEARCH_DATA_ASYNC_SUCCESS,
  SEARCH_DATA_ASYNC_FAILURE,
  SAVE_DATA_ASYNC,
  REMOVE_DATA_ASYNC,
  searchDataAsync,
} from "../actions/index";

// INITIAL STATE
const initialState = {
  dashboard: [],
  lastId: 0,
};

// Saga Create
const searchDataSaga = createRequestSaga(SEARCH_DATA_ASYNC, API.getData);
// const saveDataSaga = createRequestSaga(SAVE_DATA_ASYNC, API.postData);
// const removeDataSaga = createRequestSaga(REMOVE_DATA_ASYNC, API.removeData);

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
        // cpu: data[i].cpu,
        // memory: data[i].memory,
        // storage: data[i].storage,
        // blockchainInfo: data[i].blockchainInfo,
        // ledgerInfo: data[i].ledgerInfo,
        // resourceInfo: data[i].resourceInfo,
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
        // cpu: data[i].cpu,
        // memory: data[i].memory,
        // storage: data[i].storage,
        // blockchainInfo: data[i].blockchainInfo,
        // ledgerInfo: data[i].ledgerInfo,
        // resourceInfo: data[i].resourceInfo,
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
