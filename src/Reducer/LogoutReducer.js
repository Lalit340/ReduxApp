import { LOGOUT_OPEN, LOGOUT_CLOSE } from "../constants/ActionTypes";

export default (state = { click: true, success: '', error: '', errToast: [] }, action) => {
    switch (action.type) {
        case LOGOUT_OPEN:
            return {
                ...state,
            };
        case LOGOUT_CLOSE:
            return {
                ...state,
                click: false,
            };

        default:
            return state;
    }
}