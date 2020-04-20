import { FETCH_USER } from "../actions/actionTypes";

const DEFALUT_STATE = null;

const authReducer = (state = DEFALUT_STATE, action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}

export default authReducer;