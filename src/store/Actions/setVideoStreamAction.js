import {SET_VIDEO_STREAM} from "../types";

const setVideoStreamAction = (payload) => {
    return {
        type: SET_VIDEO_STREAM,
        payload: payload
    }
}

export default setVideoStreamAction
