import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { Actions as actions } from '.';
import { getListProduct } from 'server/product';
import { ActionsProducts } from '.';

function* getProduct() {
  const data = yield call(getListProduct);
  const dataCut = data.data.rows.filter((x, index) => index < 17);
  console.log(dataCut);
  yield put(ActionsProducts.getDataSuccess(data.data.rows));
}

export function* Saga() {
  yield takeLatest(ActionsProducts.getData.type, getProduct);
}
