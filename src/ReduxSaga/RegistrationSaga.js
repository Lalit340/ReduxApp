import { request } from 'redux-saga';
import { call, put , takeEvery } from 'redux-saga/effects'
import { REGISTRATION_CALL, REGISTRATION_SUCCESS, REGISTRATION_FAIL, REGISTRATION_START } from '../constants/ActionTypes';
import auth from './Controller';

export function* registration(action) {
    try {
        console.log("data i  sag   " + JSON.stringify(action.payload))
        yield put({ type: REGISTRATION_CALL });
        

        const response = yield call(signin => auth.signup(action.payload));
        console.log("response in fsaga--" + JSON.stringify(response.status));


        yield put({ type: REGISTRATION_SUCCESS, payload: response.status })
    }catch(error){
        console.log("error in saga--- " + JSON.stringify(error.response.status))
        yield put({ type:REGISTRATION_FAIL, payload: error.response.status })
    };
    
}

export function* watchSignup( ) {
   yield takeEvery( REGISTRATION_START , registration);
    
}