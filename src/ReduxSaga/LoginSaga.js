import { request } from 'redux-saga';
import { put, call, all,  takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_CALL, LOGIN_USER, DATABASE_ERROR, LOGIN_RESPONSE } from '../constants/ActionTypes';
import auth from './Controller';


export function* loginPage(action) {
    try {
        console.log("data i  sag   " + JSON.stringify(action.payload))
        yield put({ type: LOGIN_CALL });

        const response = yield call(login => auth.login(action.payload))
        console.log("response in fsaga--" + JSON.stringify(response.status));


        yield put({ type: LOGIN_RESPONSE, payload: response })
    }
    catch (error) {
        console.log("error in saga--- " + JSON.stringify(error.response.status))
        yield put({ type: DATABASE_ERROR, payload: error.response })
    }


}

export function* watchLogin() {
    yield takeEvery(LOGIN_USER, loginPage);
}


