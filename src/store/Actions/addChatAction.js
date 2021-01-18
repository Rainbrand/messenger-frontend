import {ADD_CHAT} from "../types"

const addChatAction = payload => {
    return{
        type: ADD_CHAT,
        payload: payload
    }
}

export default addChatAction
