import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../reducers/loadingReducer";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    var response = null;
    try {
      // console.warn(action);
      response = yield call(request, action.payload);
      if (response === null || response === undefined) {
        yield put({
          type: SUCCESS,
          payload: "Success",
        });
        console.warn("result: success!!");
      } else {
        yield put({
          type: SUCCESS,
          // payload: response.data,
          payload: response,
        });
        // console.warn(response);
      }
    } catch (e) {
      if (response === null || response === undefined) {
        yield put({
          type: FAILURE,
          payload: e,
          error: "Fail",
        });
        console.warn(e);
      } else {
        yield put({
          type: FAILURE,
          payload: e,
          error: response,
        });
        console.warn(response);
        console.warn(e);
      }
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
