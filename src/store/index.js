import {combineReducers} from "redux";
import userReducer from "./Reducers/userReducer";
import chatInfoReducer from "./Reducers/chatInfoReducer";
import chatMessagesReducer from "./Reducers/chatMessagesReducer";
import chatPreviewReducer from "./Reducers/chatPrevewReducer";
import socketReducer from "./Reducers/socketReducer";
import chatUsersReducer from "./Reducers/chatUsersReducer";
import modalToggleReducer from "./Reducers/modalToggleReducer";
import videoStreamReducer from "./Reducers/videoStreamReducer";

const rootReducer = combineReducers({
    user: userReducer,
    chatInfo: chatInfoReducer,
    users: chatUsersReducer,
    chatMessages: chatMessagesReducer,
    chatPreviews: chatPreviewReducer,
    socket: socketReducer,
    modals: modalToggleReducer,
    stream: videoStreamReducer
})

export default rootReducer
