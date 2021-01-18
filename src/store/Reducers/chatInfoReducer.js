import {SET_CURRENT_CHAT_INFO} from "../types";
import initialState from "../initialState";

const chatInfoReducer = (state = initialState.currentChatInfo, action) => {
    switch (action.type){
        case SET_CURRENT_CHAT_INFO:
            return state = {
                currentChatInfoName: action.payload.currentChatInfoName,
            }
        default:
            return state
    }
}

export default chatInfoReducer
