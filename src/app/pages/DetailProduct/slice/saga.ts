import { Actions as actions } from '.';

import { call, put, takeLatest } from 'redux-saga/effects';
import { actionReview, getProductDetailAPI, getReview } from 'server/product';

function* handleGetProductDetail(action) {
  const data = yield call(getProductDetailAPI, action.payload.id);

  yield put(actions.getProductDetailSuccess(data.data));
}

function* handleGetReviewReq(action) {
  const data = yield call(getReview, action.payload);
  console.log(data.data.rows);
  yield put(actions.handleGetReviewSuccess(data.data.rows));
}

function* handleCreateReview(action) {
  yield call(actionReview, action.payload);
  yield put(actions.handleReviewsSuccess());
}
export function* Saga() {
  yield takeLatest(actions.getProductDetail.type, handleGetProductDetail);
  yield takeLatest(actions.handleGetReview.type, handleGetReviewReq);
  yield takeLatest(actions.handleReviews.type, handleCreateReview);
}
