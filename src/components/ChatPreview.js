import React from 'react'
import styled from "styled-components";
import TextTruncate from "react-text-truncate";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import setCurrentChatAction from "../store/Actions/setCurrentChatAction";

const StyledChatPreview = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0.8em 0.5em 0.8rem;
  height: 50px;

  &:hover {
    background-color: #d4d4d4;
    cursor: pointer;
  }

  .chatPreview__info {
    margin-right: 1rem;
    flex: 1;
  }

  .chatPreview__name {
    margin-bottom: 0.3em;
    font-family: Roboto, sans-serif;
    font-weight: bold;
  }
`

/**
 * Component renders chat previews on chat sidebar.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function ChatPreview(props) {
    const dispatch = useDispatch()

    return(
        <StyledChatPreview className="chatPreview" onClick={() => {
            dispatch(setCurrentChatAction({
                currentChatInfoName: props.name,
            }))
        }}>
            <div className="chatPreview__info">
                <div className="chatPreview__name">
                    <TextTruncate line={1} element="div" truncateText="..." text={props.name}/>
                </div>
                <div className="chatPreview__lastMessage">
                    <TextTruncate line={1} element="div" truncateText="..." text={props.lastMessage}/> {/*Truncates text
                    so only small part is shown*/}
                </div>
            </div>
            <div className="chatPreview__lastMessageTime">
                {props.lastMessageTime}
            </div>
        </StyledChatPreview>
    )
}

ChatPreview.propTypes = {
    name: PropTypes.string,
    lastMessage: PropTypes.string,
    lastMessageTime: PropTypes.string
}

export default ChatPreview;
