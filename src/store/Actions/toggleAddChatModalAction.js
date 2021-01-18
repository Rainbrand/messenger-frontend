import {TOGGLE_ADD_CHAT_MODAL} from "../types"

const toggleAddChatModalActon = payload => {
    return{
        type: TOGGLE_ADD_CHAT_MODAL,
        payload: payload
    }
}

export default toggleAddChatModalActon
