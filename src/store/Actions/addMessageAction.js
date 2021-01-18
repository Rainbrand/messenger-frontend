import {ADD_MESSAGE} from "../types";

const addMessageAction = (payload) => {
    return {
        type: ADD_MESSAGE,
        payload: payload
    }
}

export default addMessageAction