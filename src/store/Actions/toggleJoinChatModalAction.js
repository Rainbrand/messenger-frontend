import {TOGGLE_JOIN_CHAT_MODAL} from "../types"

const toggleJoinChatModalAction = payload => {
    return{
        type: TOGGLE_JOIN_CHAT_MODAL,
        payload: payload
    }
}

export default toggleJoinChatModalAction
