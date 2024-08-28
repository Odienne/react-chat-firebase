import "./chatList.css"
import {useState, useEffect} from "react";
import AddUser from "./addUser/AddUser.jsx";
import {db} from "../../../lib/firebase.js";
import {useUserStore} from "../../../lib/userStore.js";
import {doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import {useChatStore} from "../../../lib/chatStore.js";
import {toast} from "react-toastify";
import ReactTimeAgo from "react-time-ago";

const ChatList = () => {
    const [searchInput, setSearchInput] = useState("");
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);

    const {currentUser} = useUserStore();
    const {changeChat} = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const chatsItems = res.data().chats;

            const promises = chatsItems.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return {...item, user};
            })

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));

        })

        return () => {
            unSub();
        }
    }, [currentUser.id])


    const handleChatSelect = async (chat) => {
        const userChats = chats.map(chat => {
            const {user, ...rest} = chat;
            return rest;
        })

        const chatIndex = userChats.findIndex(i => i.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id);

        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            })
            changeChat(chat.chatId, chat.user);
        } catch (err) {
            toast.error(err);
        }
    }

    const filteredChats = chats.filter(chat => chat.user.username.toLowerCase().includes(searchInput.toLowerCase()))

    return (
        <div className="chatList">
            <div className="chatList__search">
                <div className="chatList__search__searchBar">
                    <img src="./search.png" alt="search"/>
                    <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="search"/>
                </div>
                <img onClick={() => setAddMode(!addMode)} className="chatList__search__addRemove"
                     src={addMode ? "./minus.png" : "./plus.png"}
                     alt={addMode ? "remove" : "add"}/>
            </div>
            <div className="chatlist__conversations">
                {filteredChats.map((chat) => (
                    <div className="chatlist__conversations__conv" key={chat.chatId} onClick={() => handleChatSelect(chat)}
                    style={{backgroundColor: chat?.isSeen ? "transparent" : "rgba(81,131,254,0.25)"}}>
                        <img src={chat.user.avatarUrl || "./avatar.png"} alt="avatar"/>
                        <div className="chatlist__conversations__conv__latestMessage">
                            <span>{chat.user.username}</span>
                            <p className={!chat.isSeen ? "chatlist__conversations__conv__latestMessage--bold chatlist__conversations__conv__latestMessage--italic" : ""}>{chat.lastMessage}</p>
                            <small><ReactTimeAgo date={chat.updatedAt} locale="en-US"/></small>
                        </div>
                    </div>
                ))}
                {addMode && <AddUser callback={setAddMode}/>}
            </div>
        </div>
    );
};

export default ChatList;
