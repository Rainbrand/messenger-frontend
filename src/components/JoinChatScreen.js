import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import InputForm from "./InputForm";
import setCurrentChatAction from "../store/Actions/setCurrentChatAction";
import addChatAction from "../store/Actions/addChatAction";
import toggleJoinChatModalActon from "../store/Actions/toggleJoinChatModalAction";


const StyledJoinChatScreen = styled.div`
  width: 100%;
  height: 100%;
  
  .joinChatScreen__inputForm{
    position: absolute;
    margin: 0 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 100%;
    z-index: 100;
  }
`

/**
 * Component contains modal screen and chat input form.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function JoinChatScreen(props) {
    const dispatch = useDispatch()
    const [optionalText, setOptionalText] = useState("")
    const socket = useSelector(store => store.socket)
    const user = useSelector(store => store.user)

    /**
     * Handles 'room_joined' event, closes modal, pushes system message to store and updates current chat message
     */
    useEffect(() => {
        socket.on('room_joined', args => {
            dispatch(toggleJoinChatModalActon(false))
            dispatch(addChatAction({
                previewName: args.roomName,
                previewText: "",
                previewLastMessage: "",
                previewLastMessageTime: ""
            }))
            dispatch(setCurrentChatAction({currentChatInfoName: args.roomName}))
        })

        return () => socket.off('room_joined')

    }, [socket])

    useEffect(() => {
        socket.on('room_not_exit', args => {
            setOptionalText(args)
        })

        return () => socket.off('room_not_exit')
    }, [socket])

    useEffect(() => {
        socket.on('already_joined', args => {
            setOptionalText(args)
        })

        return () => socket.off('already_joined')
    }, [socket])

    /**
     * Method passed to join chat form
     * @param event
     * @param input
     */
    const handleSubmit = (event, input) => {
        event.preventDefault()
        if (input !== "")  {
            socket.emit('join_room', {
                roomName: input,
                userId: user.currentUserId
            })
        }
    }

    const handleClick = () => {
        dispatch(toggleJoinChatModalActon(false))
    }

    return (
        <StyledJoinChatScreen className="joinChatScreen" >
            <Modal classname="joinChatScreen__modal" handleClick={handleClick}/>
            <InputForm className="joinChatScreen__inputForm" handleSubmit={handleSubmit} title="JOIN CHAT"
                       textField="Enter Chat Name" optionalText={optionalText}/>
        </StyledJoinChatScreen>
    );
}

export default JoinChatScreen;
