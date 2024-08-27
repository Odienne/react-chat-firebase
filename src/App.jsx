import List from "../components/list/List.jsx";
import Detail from "../components/detail/Detail.jsx";
import Chat from "../components/chat/Chat.jsx";
import Login from "../components/login/Login.jsx";
import Notification from "../components/notification/Notification.jsx";

const App = () => {
    const user = true;

    return (
        <div className='container'>
            {user ?
                <>
                    <List/>
                    <Chat/>
                    <Detail/>
                </>
                :
                <Login/>
            }
            <Notification/>
        </div>
    )
}

export default App
