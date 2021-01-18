import {SET_USER} from "../types";

const setUserAction = (payload) => {
    return {
        type: SET_USER,
        payload: payload
    }
}

export default setUserAction
