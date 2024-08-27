import "./chatList.css"
import {useState} from "react";
import AddUser from "./addUser/AddUser.jsx";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);


    return (
        <div className="chatList">
            <div className="chatList__search">
                <div className="chatList__search__searchBar">
                    <img src="./search.png" alt="search"/>
                    <input type="text" placeholder="search"/>
                </div>
                <img onClick={() => setAddMode(!addMode)} className="chatList__search__addRemove"
                     src={addMode ? "./minus.png" : "./plus.png"}
                     alt={addMode ? "remove" : "add"}/>
            </div>
            <div className="chatlist__conversations">
                <div className="chatlist__conversations__conv">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chatlist__conversations__conv__latestMessage">
                        <span>Kim Kutu</span>
                        <p>Yo dude</p>
                    </div>
                </div>
                <div className="chatlist__conversations__conv">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chatlist__conversations__conv__latestMessage">
                        <span>Kim Kutu</span>
                        <p>Yo dude</p>
                    </div>
                </div>
                <div className="chatlist__conversations__conv">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chatlist__conversations__conv__latestMessage">
                        <span>Kim Kutu</span>
                        <p>Yo dude</p>
                    </div>
                </div>
                <div className="chatlist__conversations__conv">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chatlist__conversations__conv__latestMessage">
                        <span>Kim Kutu</span>
                        <p>Yo dude</p>
                    </div>
                </div>
                <div className="chatlist__conversations__conv">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chatlist__conversations__conv__latestMessage">
                        <span>Kim Kutu</span>
                        <p>Yo dude</p>
                    </div>
                </div>
                {addMode && <AddUser/>}
            </div>
        </div>
    );
};

export default ChatList;
