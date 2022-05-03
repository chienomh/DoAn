import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { listProduct } from 'server/product';
import { Actions as actions } from '.';

function* getProducts(action) {
  const data = yield call(listProduct, action.payload);
  yield put(actions.getListProductSuccess(data.data.rows));
}

export function* Saga() {
  yield takeLatest(actions.getListProduct.type, getProducts);
}
