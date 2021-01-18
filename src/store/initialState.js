const initialState = {
    currentUser: {
        currentUserName: null,
        currentUserId: null
    },
    currentChatInfo: {
        currentChatInfoName: null,
    },
    users: [],
    chats: [{}],
    messages: [],
    chatPreviews: [],
    socket: null,
    addUserModalToggled: false,
    addChatModalToggled: false,
    joinChatModalToggled: false,
    videoStream: null
}

export default initialState
