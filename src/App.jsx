import List from "../components/list/List.jsx";
import Detail from "../components/detail/Detail.jsx";
import Chat from "../components/chat/Chat.jsx";
import Login from "../components/login/Login.jsx";
import Notification from "../components/notification/Notification.jsx";
import {useEffect} from "react";
import {auth} from "../lib/firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {useUserStore} from "../lib/userStore.js";
import {useChatStore} from "../lib/chatStore.js";


const App = () => {
    const {chatId} = useChatStore();
    const {currentUser, isLoading, fetchUserInfo} = useUserStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        })

        return () => {
            unSub();
        }
    }, [fetchUserInfo]);

    if (isLoading) return <div className="loading">Loading...</div>;

    return (
        <div className='container'>
            {currentUser ?
                <>
                    <List/>
                    {chatId ? <Chat/> : <div className="chat"/>
                    }
                    {chatId ? <Detail/> :
                        <div className="detail">
                            <button onClick={() => auth.signOut()} className="detail__info__logout">Logout</button>
                        </div>
                    }
                </>
                :
                <Login/>
            }
            <Notification/>
        </div>
    )
}

export default App
