import "./chatList.css"
import {useState} from "react";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);


    return (
        <div className="chatList">
            <div className="chatList__search">
                <div className="chatList__search__searchBar">
                    <img src="./search.png" alt="search"/>
                    <input type="text" placeholder="search"/>
                </div>
                <img onClick={() => setAddMode(!addMode)} className="chatList__search__addRemove" src={addMode ? "./plus.png" : "./minus.png"}
                     alt={addMode ? "add" : "remove"}/>
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
            </div>
        </div>
    );
};

export default ChatList;
