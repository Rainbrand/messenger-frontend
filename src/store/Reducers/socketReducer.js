import {SET_SOCKET} from "../types";
import initialState from "../initialState";

const socketReducer = (state = initialState.socket, action) => {
    switch (action.type){
        case SET_SOCKET:
            return state = action.payload
        default:
            return state
    }
}

export default socketReducer
