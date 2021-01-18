import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import ChatPreview from "./ChatPreview";
import {IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import PostAddIcon from '@material-ui/icons/PostAdd';
import toggleAddChatModalActon from "../store/Actions/toggleAddChatModalAction";
import toggleJoinChatModalAction from "../store/Actions/toggleJoinChatModalAction";
import setChatUsersAction from "../store/Actions/setChatUsersAction";

const StyledChatSidebar = styled.div.attrs(props => ({
    className: 'chatSidebar'
}))`
  display: flex;
  flex-flow: column;
  flex: .20;
  overflow-y: auto;
  background-color: #f5f4f4;
  border-right: ${props => props.className === 'chatSidebar--left' ? '1px solid lightgrey' : null};
  border-left: ${props => props.className === 'chatSidebar--right' ? '1px solid lightgrey' : null};
  
  
  .chatSidebar__users{
    display: flex;
    flex-flow: column;
  }
  
  .chatSidebar__user{
    align-items: center;
    padding: 0.5em 0.8em 0.5em 0.8rem;
    height: 50px;
    margin-bottom: 0.3em;
    font-family: Roboto, sans-serif;
    font-weight: bold;
  }
`

const StyledDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0.8em 0.5em 0.8rem;
  height: 50px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
`

const StyledDividerChats = styled(StyledDivider)`
  display: flex;
  justify-content: space-between;
  background-color: #fca5a5;
`

const StyledDividerUsers = styled(StyledDivider)`
  background-color: #a5b3fc;
`

const StyledUserInfo = styled(StyledDivider)`
  text-align: left;
`
/**
 * Component renders joined chats, users in current chat info about user, dividers and buttons for adding and joining room.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const ChatSidebar = props => {
    const currentUser = useSelector(store => store.user)
    const chatPreviews = useSelector(store => store.chatPreviews)
    const currentChatInfo = useSelector(store => store.chatInfo)
    const allUsers = useSelector(store => store.users)
    const socket = useSelector(store => store.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('room_users_list', args => {
            console.log(args)
            dispatch(setChatUsersAction({
                roomName: args.roomName,
                chatUsers: args.chatUsers
            }))
        })

        return () => socket.off('room_users_list')
    }, [socket])

    return (
        <StyledChatSidebar className={props.className}>
            <StyledUserInfo>
                Signed as: {currentUser.currentUserName}, ID: {currentUser.currentUserId}
            </StyledUserInfo>
            <StyledDividerChats className="chatSidebar__divider--chats">
                CHATS
                <div className="chatSidebar__divider--chats__buttons">
                    <IconButton className="chatSidebar__addChat" onClick={event => {
                        dispatch(toggleAddChatModalActon(true))
                    }}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton className="chatSidebar__joinChat" onClick={event => {
                        dispatch(toggleJoinChatModalAction(true))
                    }}>
                        <PostAddIcon/>
                    </IconButton>
                </div>
            </StyledDividerChats >
            <div className="chatSidebar__chats">
                {chatPreviews !== null ?
                    chatPreviews.map((preview) => (
                    <ChatPreview key={preview.previewName}
                                 name={preview.previewName}
                                 lastMessage={preview.previewLastMessage}
                                 lastMessageTime={preview.previewLastMessageTime}
                    />
                )): null}
            </div>
            <StyledDividerUsers className="chatSidebar__divider--users">
                USERS IN CHAT
            </StyledDividerUsers>
            <div className="chatSidebar__users">
                {allUsers.map(entry => (
                    entry.roomName === currentChatInfo.currentChatInfoName ?
                        entry.chatUsers.map(user => (
                            <div className="chatSidebar__user" key={user.userId}>
                                {user.userName}
                            </div>
                        )): null
                ))}
            </div>
        </StyledChatSidebar>
    )
};

export default ChatSidebar;
