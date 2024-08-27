import "./chat.css"

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat__top">
                <div className="chat__top__user">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chat__top__user__info">
                        <span>Kim Kimju</span>
                        <p>Currently away for vacations</p>
                    </div>
                </div>
                <div className="chat__top__user__icons">
                    <img src="./phone.png" alt="phone"/>
                    <img src="./video.png" alt="video"/>
                    <img src="./info.png" alt="info"/>
                </div>
            </div>
            <div className="chat__center"></div>
            <div className="chat__bottom">
                <div className="chat__bottom__icons">
                    <img src="./img.png" alt="img"/>
                    <img src="./camera.png" alt="camera"/>
                    <img src="./mic.png" alt="mic"/>
                </div>
                <input type="text" placeholder="Type a message..."/>
                <div className="chat__bottom__emoji">
                    <img src="./emoji.png" alt="emoji"/>
                </div>
                <button className="chat__bottom__send">Send</button>
            </div>
        </div>
    );
};

export default Chat;
