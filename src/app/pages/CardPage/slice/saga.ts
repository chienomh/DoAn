import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { Actions as actions } from '.';
import { createBill } from 'server/billService';

function* handCreateBill(action) {
  try {
    yield call(createBill, action.payload);
    put(actions.handleCreateBillSuccess());
  } catch (error) {
    put(actions.handleCreateBillFaild());
  }
}

export function* Saga() {
  yield takeLatest(actions.handleCreateBill.type, handCreateBill);
}
