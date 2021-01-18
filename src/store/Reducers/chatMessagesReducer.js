import {ADD_MESSAGE} from "../types";
import initialState from "../initialState";

const chatMessagesReducer = (state = initialState.messages, action) => {
    switch (action.type){
        case ADD_MESSAGE:
            return [...state,
                {
                    messageId: action.payload.messageId, //Pulled from server
                    messageText: action.payload.messageText,
                    messageTime: action.payload.messageTime,
                    messageRoomName: action.payload.messageRoomName,
                    messageSender: action.payload.messageSender,
                    messageSystem: action.payload.messageSystem
                }
            ]
        default:
            return state
    }
}

export default chatMessagesReducer

