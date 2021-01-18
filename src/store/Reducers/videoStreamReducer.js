import {SET_VIDEO_STREAM} from "../types";
import initialState from "../initialState";

const videoStreamReducer = (state = initialState.videoStream, action) => {
    switch (action.type){
        case SET_VIDEO_STREAM:
            return action.payload
        default:
            return state
    }
}

export default videoStreamReducer
