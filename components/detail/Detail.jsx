import "./detail.css"
import {auth, db} from "../../lib/firebase.js";
import {useChatStore} from "../../lib/chatStore.js";
import {useUserStore} from "../../lib/userStore.js";
import {toast} from "react-toastify";
import {
    arrayUnion,
    updateDoc,
    arrayRemove,
    doc,
    onSnapshot,
    collection,
    query,
    where,
    getDocs, getDoc
} from "firebase/firestore";
import {useEffect} from "react";
import {useState} from "react";

const Detail = () => {
    const [sharedPictures, setSharedPictures] = useState([]);
    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
    const {currentUser} = useUserStore();

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            });
            changeBlock();
        } catch (err) {
            toast.error(err);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const userChatsRef = doc(db, "chats", chatId);
            const userChatsSnapshot = await getDoc(userChatsRef);

            if (userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data();
                setSharedPictures(userChatsData.messages.filter(m => m.img))
            }
        }
        if (chatId) {
            getData();
        }

    }, [chatId]);

    return (
        <div className="detail">
            <div className="detail__user">
                <img src={user?.avatarUrl ? user.avatarUrl : "./avatar.png"} alt="avatar"/>
                <h2>{user?.username}</h2>
                {/*<p>Currently available</p>*/}
            </div>
            <div className="detail__info">
                <div className="detail__info__options">
                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Chat settings</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                    </div>

                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Privacy / Help</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                    </div>

                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Shared pictures</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                        <div className="detail__info__options__option__pictures">
                            {sharedPictures.map(p => (
                                <div className="detail__info__options__option__pictures__picture" key={p.createdAt}>
                                    <div className="detail__info__options__option__pictures__picture__detail">
                                        <img src={p.img} alt="placeholder"
                                             className="detail__info__options__option__pictures__picture__detail__img"/>
                                        <a href={p.img} download>
                                            <img src="./download.png" alt="download"
                                                 className="detail__info__options__option__pictures__picture__detail__download"/>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Shared files</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                    </div>

                </div>
                <button onClick={handleBlock}
                        className="detail__info__blockUser">{isCurrentUserBlocked ? `${user?.username} blocked you.` : isReceiverBlocked ? "Unblock user" : "Block user"}</button>
                <button onClick={() => auth.signOut()} className="detail__info__logout">Logout</button>
            </div>
        </div>
    );
};

export default Detail;
