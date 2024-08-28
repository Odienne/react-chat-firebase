import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";
import {arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../lib/firebase.js";
import {useChatStore} from "../../lib/chatStore.js";
import {toast} from "react-toastify";
import {useUserStore} from "../../lib/userStore.js";
import upload from "../../lib/upload.js";
import ReactTimeAgo from 'react-time-ago'

const Chat = () => {
    const [img, setImg] = useState({
        file: null,
        url: ""
    });
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState([]);
    const [emojiPicking, setEmojiPicking] = useState(false);
    const [text, setText] = useState("");
    const [caretPosition, setCaretPosition] = useState(0);
    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore();
    const {currentUser} = useUserStore();

    const endRef = useRef();

    const handleEmojiChoice = (e) => {
        setText(prev => prev.slice(0, caretPosition) + e.emoji + prev.slice(caretPosition));
        setEmojiPicking(false);
    }

    const handleInputChange = (e) => {
        setCaretPosition(e.target.selectionStart)
        setText(e.target.value);
    }

    const handleSend = async (e) => {
        e.preventDefault();

        if (text.trim() === "" && !img.file) {
            toast.error("Please join a text message !")
            return;
        }

        let imgUrl = null;

        try {
            if (img.file) {
                setLoading(true);

                imgUrl = await upload(img.file);
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && {img: imgUrl}),
                })
            })

            const userIds = [currentUser.id, user.id]

            for (const id of userIds) {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);
                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    })
                }
            }

        } catch (err) {
            toast.error("Error : " + err.message)
        } finally {
            setLoading(false);
        }

        setImg({
            file: null,
            url: ""
        })
        setText("");

    }

    const handleImgUpload = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    useEffect(() => {
        return () => {
            endRef.current?.scrollIntoView({behavior: "smooth"});
        };
    }, []);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), async (res) => {
            setChat(res.data());
        })

        return () => {
            unSub();
        }

    }, [chatId]);


    return (
        <div className="chat">
            <div className="chat__top">
                <div className="chat__top__user">
                    <img src={user?.avatarUrl ? user.avatarUrl : "./avatar.png"} alt="avatar"/>
                    <div className="chat__top__user__info">
                        <span>{user?.username}</span>
                        {/*<p>Currently away for vacations</p>*/}
                    </div>
                </div>
                <div className="chat__top__user__icons">
                    <img src="./phone.png" alt="phone"/>
                    <img src="./video.png" alt="video"/>
                    <img src="./info.png" alt="info"/>
                </div>
            </div>
            <div className="chat__center">
                {chat?.messages?.map(message => (
                    <div
                        className={message.senderId === currentUser?.id ? "chat__center__message chat__center__message__self" : "chat__center__message"}
                        key={message?.createdAt}>
                        {message.senderId !== currentUser.id &&
                            <img className="chat__center__message__avatar"
                                 src={user?.avatarUrl ? user.avatarUrl : "./avatar.png"} alt="avatar"/>
                        }
                        <div className="chat__center__message__text">
                            {message.img &&
                                <img src={message.img} alt="image"/>
                            }
                            {message.text &&
                                <p>
                                    {message.text}
                                </p>}
                            <span><ReactTimeAgo date={message.createdAt.toDate()} locale="en-US"/></span>
                        </div>
                    </div>
                ))}

                {img.url &&
                    <div className="chat__center__message chat__center__message__self">
                        <div className="texts">
                            <img className="chat__center__message__preview" src={img.url} alt="image"/>
                        </div>
                    </div>
                }
                <div ref={endRef}>

                </div>
            </div>
            {loading && <div className="chat__bottom__loading">Envoi en cours...</div>}
            <form onSubmit={handleSend} className="chat__bottom">
                <div className="chat__bottom__icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="img"/>
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleImgUpload}/>
                    <img src="./camera.png" alt="camera"/>
                    <img src="./mic.png" alt="mic"/>
                </div>
                <input disabled={isCurrentUserBlocked || isReceiverBlocked} value={text} type="text"
                       placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You cannot contact this person" : "Type a message..."}
                       onClick={handleInputChange}
                       onChange={handleInputChange}/>
                <div className="chat__bottom__send--flex">
                    <div className="chat__bottom__emoji">
                        <img onClick={() => setEmojiPicking(!emojiPicking)} src="./emoji.png" alt="emoji"/>
                        <div className="chat__bottom__emoji__pickerContainer">
                            <EmojiPicker open={emojiPicking} onEmojiClick={handleEmojiChoice}/>
                        </div>
                    </div>
                    <button className="chat__bottom__send"
                            disabled={isCurrentUserBlocked || isReceiverBlocked}>Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
