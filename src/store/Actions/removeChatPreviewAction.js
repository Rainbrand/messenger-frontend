import {REMOVE_CHAT_PREVIEW} from "../types";

const removeChatPreviewAction = payload => {
    return {
        type: REMOVE_CHAT_PREVIEW,
        payload: payload
    }
}

export default removeChatPreviewAction
