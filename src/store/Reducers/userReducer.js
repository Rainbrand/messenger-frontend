import {SET_USER} from "../types";
import initialState from "../initialState";

const userReducer = (state = initialState.currentUser, action) => {
    switch (action.type){
        case SET_USER:
            return {
                currentUserName: action.payload.currentUserName,
                currentUserId: action.payload.currentUserId
            }
        default:
            return state
    }
}

export default userReducer
