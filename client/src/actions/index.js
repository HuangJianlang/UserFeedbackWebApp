import axios from "axios";
import { FETCH_USER } from "./actionTypes";

//if there are a lot of actionCreators in actions folder:
// export * from "./yyAction"
// export * from "./xxAction"


//common use
// const fetchUser = () => {
//     const request = axios.get("/api/current_user");
//     return {
//         type: FETCH_USER,
//         request: request
//     };
// };


//react-thunk will check whether an actionCreator return a function
//if so, react-thunk will pass dispatch into that function and execute it
/**
    export const fetchUser = () => {
        return async function(dispatch) {
            const request = await axios.get("/api/current_user");
            //we only want to dispatch action when request is completed
            dispatch({
                type: FETCH_USER,
                payload: request
            })
        }
    };
*/

export const fetchUser = () => async dispatch => {
    const response = await axios.get("/api/current_user");
    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
}

export const handleToken = (token) => async (dispatch) => {
    const response = await axios.post("/api/stripe", token);
    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
}