import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import InputForm from "./InputForm";
import toggleAddChatModalActon from "../store/Actions/toggleAddChatModalAction";
import setCurrentChatAction from "../store/Actions/setCurrentChatAction";
import addChatAction from "../store/Actions/addChatAction";


const StyledAddChatScreen = styled.div`
  width: 100%;
  height: 100%;
  
  .addChatScreen__inputForm{
    position: absolute;
    margin: 0 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 100%;
    z-index: 100;
  }
`

/**
 * Same component as 'JoinChatScreen', but this handles creating room instead of joining
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function AddChatScreen(props) {
    const dispatch = useDispatch()
    const [optionalText, setOptionalText] = useState("")
    const socket = useSelector(store => store.socket)
    const user = useSelector(store => store.user)

    /**
     * Method handles adding new chat to storage, setting active chat and closing modal
     */
    useEffect(() => {
        socket.on('room_created', args => {
            dispatch(addChatAction({
                previewName: args.roomName,
                previewText: "",
                previewLastMessage: "",
                previewLastMessageTime: ""
            }))
            dispatch(setCurrentChatAction({currentChatInfoName: args.roomName}))
            dispatch(toggleAddChatModalActon(false))

        })

        return () => socket.off('room_created')

    }, [socket])

    useEffect(() => {
        socket.on('room_already_exist', args => {
            setOptionalText("This Chat Name is already exist")
        })

        return () => socket.off('room_already_exist')
    }, [socket])

    /**
     * Method that passed to input form
     * @param event
     * @param input
     */
    const handleSubmit = (event, input) => {
        event.preventDefault()
        if (input !== "")  {
            socket.emit('add_room', {
                roomName: input,
            })
        }
    }

    const handleClick = () => {
        dispatch(toggleAddChatModalActon(false))
    }

    return (
        <StyledAddChatScreen className="addChatScreen" >
            <Modal classname="addChatScreen__modal" handleClick={handleClick}/>
            <InputForm className="addChatScreen__inputForm" handleSubmit={handleSubmit} title="ADD CHAT"
                       textField="Enter Chat Name" optionalText={optionalText}/>
        </StyledAddChatScreen>
    );
}

export default AddChatScreen;
