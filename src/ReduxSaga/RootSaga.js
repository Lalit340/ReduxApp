
import { all } from "redux-saga/effects";
import { watchSignup } from "./RegistrationSaga";
import { watchLogin } from "./LoginSaga";

export default function* rootSaga() {
    console.log('in root saga')
    yield all([
        watchSignup(),
        watchLogin()
    ])
}