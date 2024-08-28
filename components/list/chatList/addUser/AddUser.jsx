import "./addUser.css"
import {db} from "../../../../lib/firebase.js";
import {collection, doc, where, getDocs, query, setDoc, serverTimestamp, updateDoc, arrayUnion} from "firebase/firestore";
import {useState} from "react";
import {toast} from "react-toastify";
import {useUserStore} from "../../../../lib/userStore.js";

const AddUser = (props) => {
    const [user, setUser] = useState(null);
    const {currentUser} = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "in", [username, username.toLowerCase()]));

            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data())
            }
        } catch (err) {
            toast.error("Error : "+err.message)
        }
    }

    const handleAdd = async () => {
        const chatRef = collection(db, 'chats');
        const userChatsRef = collection(db, 'userchats');

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            })

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            })

            props.callback(false);
            toast.success("User added to your list")
        } catch (err) {
            toast.error("Error : "+err.message)
        }
    }

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username"/>
                <button>Search</button>
            </form>

            {user &&
                <div className="user">
                    <div className="user__detail">
                        <img src={user?.avatarUrl ? user.avatarUrl : "./avatar.png"} alt="avatar"/>
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add user</button>
                </div>
            }
        </div>
    )
}

export default AddUser
