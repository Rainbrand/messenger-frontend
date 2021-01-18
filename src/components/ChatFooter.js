import React, {useRef} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Input from "./Input";


const StyledChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  background-color: var(--input-bg-color);

  .chatFooter__inputForm{
    display: flex;
    flex: 1;
    height: auto;
  }

  .chatFooter__submitButton {
    height: min-content;
  }
`

/**
 * Component contains text chat input. Emits 'new_message' event with basic message info on form submit.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */

const ChatFooter = React.forwardRef((ref, props) => {
    const chatInputRef = useRef(null)
    const chatInfo = useSelector(store => store.chatInfo)
    const user = useSelector(store => store.user)
    const socket = useSelector(store => store.socket)

    return (
        <StyledChatFooter className="chatFooter">
            <form className="chatFooter__inputForm" onSubmit={event => {
                event.preventDefault()
                socket.emit('new_message', {
                    messageText: event.target.textContent,
                    messageChatRoom: chatInfo.currentChatInfoName,
                    messageSender: user.currentUserName
                })
                chatInputRef.current.textContent = ""
            }}>
                <Input ref={chatInputRef} className="chatFooter__input"/>
                <IconButton className="chatFooter__submitButton" type="submit">
                    <SendIcon/>
                </IconButton>
            </form>
        </StyledChatFooter>
    );
})

export default ChatFooter;
