import { LOGOUT_DIALOG } from "../constants/ActionTypes";

export default (state = { success: '', error: '', errToast: [] }, action) => {
    switch (action.type) {
        case LOGOUT_DIALOG:
            return { ...state, [action.key]: action.value };

        default:
            return state;
    }
}