import {TOGGLE_ADD_USER_MODAL} from "../types"

const toggleAddUserModalActon = payload => {
    return{
        type: TOGGLE_ADD_USER_MODAL,
        payload: payload
    }
}

export default toggleAddUserModalActon
