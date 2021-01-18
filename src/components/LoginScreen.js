import React from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import setUserAction from "../store/Actions/setUserAction";
import {io} from "socket.io-client";
import setSocketAction from "../store/Actions/setSocketAction";
import Modal from "./Modal";
import InputForm from "./InputForm";
const ENDPOINT = "http://127.0.0.1:9000";


const StyledLoginScreen = styled.div`
  width: 100%;
  height: 100%;
  
  .loginScreen__inputForm{
    position: absolute;
    margin: 0 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 100%;
    z-index: 200;
  }
`

/**
 * First component that is show on entering. Contains form for inputting a nickname. Handles first connection to io
 * and creating socket.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function LoginScreen(props) {
    const dispatch = useDispatch()

    /**
     * Method connects to id and dispatches socket to storage. Also sets up current user info.
     * @param event
     * @param input
     */
    const handleSubmit = (event, input) => {
        event.preventDefault()
        if (input !== "")  {
            dispatch(setUserAction({currentUserName: input}))
            const connection = io(ENDPOINT, {
                query: {
                    clientName: input,
                }
            })

            connection.on('connected', args => {
                dispatch(setSocketAction(connection))
                dispatch(setUserAction({currentUserName: input, currentUserId: connection.id}))
            })
        }
    }

    return (
        <StyledLoginScreen className="loginScreen">
            <Modal classname="loginScreen__modal"/>
            <InputForm className="loginScreen__inputForm" handleSubmit={handleSubmit} title="LOGIN"
                       textField="Enter your username" required={true}/>
        </StyledLoginScreen>
    );
}

export default LoginScreen;
