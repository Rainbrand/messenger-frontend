import {SET_SOCKET} from "../types"

const setSocketAction = payload => {
    return{
        type: SET_SOCKET,
        payload: payload
    }
}

export default setSocketAction
