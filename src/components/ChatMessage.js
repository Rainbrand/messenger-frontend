import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledChatMessage = styled.div.attrs(props => ({
}))`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  align-self: ${props => props.className === "chatMessage--own" ? 'flex-end' : props => props.className === "chatMessage--system" ? 'center' : 'flex-start'};
  padding-bottom: 1em;
  height: fit-content;
  width: fit-content;
  max-width: 60%;


  .chatMessage__name{
    font-size: small;
    font-weight: bold;
    padding: 0 0 0.4rem 0;
    align-self: ${props => props.className === "chatMessage--own" ? 'flex-end' : null};
  }
  
  .chatMessage__main{
    display: flex;
    align-items: center;
  }
  
  .chatMessage__textInfo{
    display: flex;
    align-items: center;
    padding: ${props => props.className === "chatMessage--system" ? null : '1rem'};
    margin: 0 10px;
    background-color: ${props => props.className === "chatMessage--own" ? '#98db98' : props => props.className === "chatMessage--system" ? 'none' : '#fcfafa'};
    border-radius: 30px;
  }
  
  .chatMessage__text{
    flex: 1;
    word-break: break-word;
  }
    
  .chatMessage__time{
    font-size: xx-small;
    width: 60px;
    padding-left: 1em;
  }
`

/**
 * Component that is used for message display. Contains info about text, sender, time, etc.
 * Styling depends on class name: own messages is always green and on the right side, system messages are
 * without background and centered, regular messages is on the left and has white background.
 * ID and time is labeled on server.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ChatMessage(props) {
    return (
        <StyledChatMessage className={props.className}>
            {props.messageTime ? <span className="chatMessage__name">{props.messageSenderName}</span> : null}
            <div className="chatMessage__main">
                <div className="chatMessage__textInfo">
                    <span className="chatMessage__text">{props.children}</span>
                    {props.messageTime ? <span className="chatMessage__time">{props.messageTime}</span> : null}
                </div>
            </div>
        </StyledChatMessage>
    );
}

ChatMessage.propTypes = {
    className: PropTypes.string,
    messageSenderName: PropTypes.string,
    messageTime: PropTypes.string,
    read: PropTypes.bool
}

export default ChatMessage;
