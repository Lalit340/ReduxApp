import { LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_USER, LOGIN_CALL, DATABASE_ERROR, LOGIN_RESPONSE } from '../constants/ActionTypes';

export default (state = { success: '', error: '', errToast: [] }, action) => {

    switch (action.type) {
        case LOGIN_EMAIL:
            return { ...state, [action.key]: action.value };
        case LOGIN_PASSWORD:
            return { ...state, [action.key]: action.value };

        case LOGIN_USER:
        case DATABASE_ERROR: {
            return {
                ...state,
                error: action.payload,           
            }

        }
        case LOGIN_RESPONSE: {

            return {
                ...state, 
                success: action.payload,
            }

        }

        case LOGIN_CALL:
            return { ...state }

        default:
            return state;
    }

}