import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

const StyledChatInput = styled.div.attrs((props) => ({
    className: 'input'
}))`
  display: flex;
  min-height: 50px;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--input-bg-color);
    
  .input__container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    min-height: 70%;
    height: auto;
    max-height: 150px;
    overflow: hidden auto;
    width: 98%;
    background-color: var(--input-field-color);
    border-radius: 20px;
  }
    
  .input__textField{
    display: inline-block;
    flex: 0.98;
    word-break: break-word;
    min-height: 1rem;
    max-height: 500px;
    background-color: var(--input-field-color);
    border: none;
    outline: none;
    cursor: text;

    &:empty:not(:focus):before{
      content: "Start typing message...";
      color: gray;
    }

    &:empty:before{
      content: "Start typing message...";
      color: lightgrey;
    }
  }
`

/**
 * Component that contains input text field. Instead of 'input' tag a 'span' with 'contentEditable' attribute is used,
 * which allowed to style placeholder and text field.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */

const Input = React.forwardRef((props, ref) => {
    const socket = useSelector(store => store.socket)
    const chatInfo = useSelector(store => store.chatInfo)
    const user = useSelector(store => store.user)

    return (
        <StyledChatInput className={props.className}>
            <div className="input__container">
                <span ref={ref} contentEditable="true" className="input__textField" onKeyDown={event => {
                    if (event.key === "Enter" && event.target.textContent !== ""){
                        event.preventDefault()
                        socket.emit('new_message', {
                            messageText: event.target.textContent,
                            messageRoomName: chatInfo.currentChatInfoName,
                        })
                        event.target.textContent = ""
                    }}}>
                </span>
            </div>
        </StyledChatInput>
    );
})

Input.propTypes = {
    className: PropTypes.string
}

export default Input;
