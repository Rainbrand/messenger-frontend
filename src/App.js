import styled from "styled-components";
import {useSelector} from "react-redux";
import ChatSidebar from "./components/ChatSidebar";
import Chat from "./components/Chat";
import LoginScreen from "./components/LoginScreen";
import AddChatScreen from "./components/AddChatScreen";
import JoinChatScreen from "./components/JoinChatScreen";


const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  --main-color: #f1f1ec;
  --input-bg-color: #ecece1;
  --input-field-color: #fcfafa;

  .app__body{
    display: flex;
    margin-top: 5vh;
    height: 90vh;
    width: 95vw;
    background-color: #FCF7FF;
    box-shadow: 0 0 2vh 0 #7A7A7A;
  }
`

function App() {
    const currentUser = useSelector(store => store.user)
    const currentChat = useSelector(store => store.chatInfo)
    const isAddChatModalToggled = useSelector(store => store.modals.addChatModalToggled)
    const isJoinChatModalToggled = useSelector(store => store.modals.joinChatModalToggled)
    const socket = useSelector(store => store.socket)

    return (
        <>
            {isAddChatModalToggled ? <AddChatScreen/> : null}
            {isJoinChatModalToggled ? <JoinChatScreen/> : null}
            <StyledApp className="app">
                {currentUser.currentUserName !== null && socket !== null ?
                    <div className="app__body">
                        <ChatSidebar className="chatSidebar--left"/>
                        {currentChat.currentChatInfoName !== null ? <Chat/> : null}
                    </div>
                    : <LoginScreen/>}
            </StyledApp>
        </>
    );
}

export default App;
