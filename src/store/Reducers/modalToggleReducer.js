import {TOGGLE_ADD_USER_MODAL, TOGGLE_ADD_CHAT_MODAL, TOGGLE_JOIN_CHAT_MODAL} from "../types";
import initialState from "../initialState";

const modalToggleReducer = (state = {
    addUserModalToggled: initialState.addUserModalToggled,
    addChatModalToggled: initialState.addChatModalToggled,
    joinChatModalToggled: initialState.joinChatModalToggled
}, action) => {
    switch (action.type){
        case TOGGLE_ADD_CHAT_MODAL:
            return {
                addChatModalToggled: action.payload,
                addUserModalToggled: state.addUserModalToggled,
                joinChatModalToggled: state.joinChatModalToggled
            }
        case TOGGLE_ADD_USER_MODAL:
            return {
                addChatModalToggled: state.addChatModalToggled,
                addUserModalToggled: action.payload,
                joinChatModalToggled: state.joinChatModalToggled
            }
        case TOGGLE_JOIN_CHAT_MODAL:
            return {
                addChatModalToggled: state.addChatModalToggled,
                addUserModalToggled: state.addUserModalToggled,
                joinChatModalToggled:  action.payload
            }
        default:
            return state
    }
}

export default modalToggleReducer

