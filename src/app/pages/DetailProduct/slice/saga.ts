import { Actions as actions } from '.';

import { call, put, takeLatest } from 'redux-saga/effects';
import { getProductDetailAPI } from 'server/product';

function* handleGetProductDetail(action) {
  const data = yield call(getProductDetailAPI, action.payload.id);

  yield put(actions.getProductDetailSuccess(data.data));
}

export function* Saga() {
  yield takeLatest(actions.getProductDetail.type, handleGetProductDetail);
}
