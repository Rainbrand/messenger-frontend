import {SET_CURRENT_CHAT_INFO} from "../types"

const setCurrentChatAction = payload => {
    return{
        type: SET_CURRENT_CHAT_INFO,
        payload: payload
    }
}

export default setCurrentChatAction