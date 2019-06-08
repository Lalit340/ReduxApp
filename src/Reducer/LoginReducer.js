import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../constants/ActionTypes';

const userCredential = {
    error: '',
}

export default (state = { success: [], error: [], errToast: [] }, action) => {

    switch (action.type) {
        case LOGIN_EMAIL:
            return { ...state, [action.key]: action.value };
        case LOGIN_PASSWORD:
            return { ...state, [action.key]: action.value };

        default:
            return state;
    }

}