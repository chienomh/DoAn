import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { registerAPI } from 'server/register';
import { ActionsAuthent } from '.';

function* handleRegister(action) {
  console.log(action);
  try {
    const data = yield call(registerAPI, action.payload);
    yield put(ActionsAuthent.registerSuccess(data));
  } catch (error) {
    yield put(ActionsAuthent.registerFaild());
  }
}

export function* Saga() {
  yield takeLatest(ActionsAuthent.register.type, handleRegister);
}
