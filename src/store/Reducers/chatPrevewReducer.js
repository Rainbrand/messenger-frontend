import {ADD_CHAT, REMOVE_CHAT_PREVIEW} from "../types";
import initialState from "../initialState";

const chatPreviewReducer = (state = initialState.chatPreviews, action) => {
    switch (action.type){
        case ADD_CHAT:
            return [...state,
                {
                    previewName: action.payload.previewName,
                    previewText: action.payload.previewText,
                    previewLastMessage: action.payload.previewLastMessage,
                    previewLastMessageTime: action.payload.previewLastMessageTime
                }
            ]
        case REMOVE_CHAT_PREVIEW:   //Preview removed correctly even if there's only one entry
            if (state.length === 1){
                return state = []
            }
            const index = state.findIndex(preview => preview.previewName === action.payload.previewName)
            state.splice(index, 1)
            return state
        default:
            return state
    }
}

export default chatPreviewReducer

