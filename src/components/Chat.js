import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import ChatHeader from "./ChatHeader.js";
import ChatMessage from "./ChatMessage.js";
import ChatFooter from "./ChatFooter";
import addMessageAction from "../store/Actions/addMessageAction";


const StyledChat = styled.div`
  display: flex;
  flex-flow: column;
  flex: .80;
    
  .chat__body{
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 2em;
    background-color: #d4d4d4;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari and Opera */
    }
  }
`

/**
 * Right side big component. Contains header with chat info and 'leave chat' button, screen on which
 * chat messages show up, footer with input field.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function Chat(props){
    const messagesEndRef = useRef(null)
    const currentChatInfo = useSelector(store => store.chatInfo)
    const messages = useSelector(store => store.chatMessages)
    const user = useSelector(store => store.user)
    const socket = useSelector(store => store.socket)
    const stream = useSelector(store => store.stream)
    const dispatch = useDispatch()

    /**
     * Method handling automatic scrolling to the chat bottom after new message is added.
     */
    useEffect(() =>{    //Scrolls to the last message automatically, ensures that a last message is always visible
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    /**
     * Method pushes message received from server to store.
     */
    useEffect(() => {
        socket.on('new_message_in_room', args => {
            console.log('new message')
            const message = {
                messageId: args.messageId,
                messageText: args.messageText,
                messageTime: args.messageTime,
                messageRoomName: args.messageRoomName,
                messageSender: args.messageSender,
                messageSystem: args.messageSystem
            }
            dispatch(addMessageAction(message))
        })

        return () => socket.off('new_message_in_room')

    }, [socket])

    /**
     * Method pushes system message about users chat leaving to message store.
     */
    useEffect(() => {
        socket.on('user_left_chat', args => {
            const message = {
                messageId: args.messageId,
                messageText: args.messageText,
                messageRoomName: args.messageRoomName,
                messageSystem: args.messageSystem
            }
            dispatch(addMessageAction(message))
        })

        return () => socket.off('user_left_chat')

    }, [socket])


    return(
        <StyledChat className="chat">
            <ChatHeader className="header chat__header" name={currentChatInfo.currentChatInfoName}/>
            <div className="chat__body">
                {messages.map(msg => (
                    msg.messageRoomName === currentChatInfo.currentChatInfoName ?
                    <ChatMessage key={msg.messageId} className={msg.messageSender === user.currentUserName ?
                        "chatMessage--own" : msg.messageSystem ? "chatMessage--system" : null}
                                 messageSenderName={msg.messageSender}
                                 messageTime={msg.messageTime} read={msg.messageRead}>
                        {msg.messageText}
                    </ChatMessage> : null
                ))}
                <div ref={messagesEndRef}/> {/*reference to the bottom of message list*/}
            </div>
            <ChatFooter className="chat__footer" placeholder="Start typing here..."/>
        </StyledChat>
    )
}

export default Chat
