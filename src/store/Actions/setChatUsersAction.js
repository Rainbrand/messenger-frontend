import {SET_CHAT_USERS} from "../types"

const setChatUsersAction = payload => {
    return{
        type: SET_CHAT_USERS,
        payload: payload
    }
}

export default setChatUsersAction
