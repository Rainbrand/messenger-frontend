import {SET_CHAT_USERS} from "../types";
import initialState from "../initialState";

const chatUsersReducer = (state = initialState.users, action) => {
    switch (action.type){
        case SET_CHAT_USERS:
            const index = state.findIndex(entry => entry.roomName === action.payload.roomName)
            console.log(`chat users index is ${index}`)
            console.log(action.payload)
            if (index !== -1){
                const newState = state.slice()
                newState.splice(index, 1, action.payload)
                return newState
            }
            return [...state, action.payload]
        default:
            return state
    }
}

export default chatUsersReducer

