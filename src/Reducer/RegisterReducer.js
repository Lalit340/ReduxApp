import { USER_EMAIL, USER_FIRSTNAME, USER_LASTNAME,
     USER_PASSWORD1, DATE_OF_BIRTH, MOBILE_NUMBER, USER_PASSWORD2,
      REGISRATIION_START, REGISTRATION_SUCCESS,
     REGISTRATION_FAIL, REGISTRATION_CALL } from '../constants/ActionTypes';

export default (state = { success: '', error: '', errToast: [] }, action) => {
    switch (action.type) {
        case USER_FIRSTNAME:
            return { ...state, [action.key]: action.value };
        case USER_LASTNAME:
            return { ...state, [action.key]: action.value };
        case USER_PASSWORD1:
            return { ...state, [action.key]: action.value };
        case USER_PASSWORD2:
            return { ...state, [action.key]: action.value };
        case DATE_OF_BIRTH:
            return { ...state, [action.key]: action.value };
        case USER_EMAIL:
            return { ...state, [action.key]: action.value };
        case MOBILE_NUMBER:
            return { ...state, [action.key]: action.value };

        case REGISRATIION_START:
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                success: action.payload,
            }

        }
        case REGISTRATION_FAIL: {
            return {
                ...state,
                error: action.payload,
            }

        }
        case REGISTRATION_CALL:
            return { ...state }

        default:
            return state;
    }
}