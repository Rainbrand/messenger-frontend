import React from 'react'
import styled from "styled-components";
import PropTypes from 'prop-types';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import setCurrentChatAction from "../store/Actions/setCurrentChatAction";
import removeChatPreviewAction from "../store/Actions/removeChatPreviewAction";
import setVideoStreamAction from "../store/Actions/setVideoStreamAction";

const StyledHeader = styled.div.attrs((props) => ({
    className: 'chatHeader'
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 5rem;
  background-color: var(--main-color);
    
  .chatHeader__info{
    display: flex;
    align-items: center;
  }
  
  .chatHeader__text{
    display: flex;
    flex-flow: column;
    padding-left: 0.5em;
  }
  
  .chatHeader__name{
    font-weight: bold;
  }
    
  .chatHeader__icons{
    display: flex;
  }

`

/**
 * Component contains chat name and 'leave chat' button which emits 'leave_room' event and dispatches info about
 * chats to store.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function ChatHeader(props) {
    const socket = useSelector(store => store.socket)
    const currentChat = useSelector(store => store.chatInfo)
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()

    return (
        <StyledHeader className={props.className}>
            <div className="chatHeader__info">
                <div className="chatHeader__text">
                    <div className="chatHeader__name">{props.name}</div>
                </div>
            </div>
            <div className="chatHeader__buttons">
                <Button onClick={() => {
                    if (currentChat.currentChatInfoName !== user.currentUserId){
                        socket.emit('leave_room', {
                            roomName: currentChat.currentChatInfoName
                        })
                        dispatch(removeChatPreviewAction({previewName: currentChat.currentChatInfoName}))
                        dispatch(setCurrentChatAction({currentChatInfoName: null}))
                        dispatch(setVideoStreamAction(null))
                    }
                }}>
                    <div className="chatHeader__leaveChat">
                        Leave Chat
                    </div>
                </Button>
            </div>
        </StyledHeader>
    );
}

ChatHeader.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    lastSeen: PropTypes.string
}

export default ChatHeader;
