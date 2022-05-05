import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getDetailUser,
  getInforAPI,
  loginAPI,
  registerAPI,
} from 'server/register';
import { ActionsAuthent } from '.';

function* handleRegister(action) {
  try {
    const data = yield call(registerAPI, action.payload);
    yield put(ActionsAuthent.registerSuccess(data));
  } catch (error) {
    yield put(ActionsAuthent.registerFaild());
  }
}

function* handleLogin(action) {
  try {
    const data = yield call(loginAPI, action.payload);
    localStorage.setItem('access_token', data.data.accessToken);
    localStorage.setItem('userId', data.data.userId);
    // const inforUser = yield call(getDetailUser, data.data.userId);
    yield put(ActionsAuthent.loginSuccess(data.data));
  } catch (error) {
    yield put(ActionsAuthent.loginFail());
  }
}

export function* Saga() {
  yield takeLatest(ActionsAuthent.register.type, handleRegister);
  yield takeLatest(ActionsAuthent.login.type, handleLogin);
}
