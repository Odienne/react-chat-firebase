import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";

const Chat = () => {
    const [emojiPicking, setEmojiPicking] = useState(false);
    const [text, setText] = useState("");
    const [caretPosition, setCaretPosition] = useState(0);

    const endRef = useRef();

    const handleEmojiChoice = (e) => {
        setText(prev => prev.slice(0, caretPosition) + e.emoji + prev.slice(caretPosition));
        setEmojiPicking(false);
    }

    const handleInputChange = (e) => {
        setCaretPosition(e.target.selectionStart)
        setText(e.target.value);
    }


    useEffect(() => {
        return () => {
            endRef.current?.scrollIntoView({behavior: "smooth"});
        };
    }, []);


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
            <div className="chat__center">
                <div className="chat__center__message">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chat__center__message__text">
                        <p>
                            I forgot my charger at your place, can I come back rn?
                        </p>
                        <span>1 min ago.</span>
                    </div>
                </div>
                <div className="chat__center__message chat__center__message__self">
                    <div className="chat__center__message__text">
                        <p>
                            I forgot my charger at your place, can I come back rn?
                        </p>
                        <span>1 min ago.</span>
                    </div>
                </div>
                <div className="chat__center__message">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chat__center__message__text">
                        <p>
                            I forgot my charger at your place, can I come back rn?
                        </p>
                        <span>1 min ago.</span>
                    </div>
                </div>
                <div className="chat__center__message">
                    <img src="./avatar.png" alt="avatar"/>
                    <div className="chat__center__message__text">
                        <img src="./placeholder-image.jpg" alt="image"/>
                        <p>
                            I forgot my charger at your place, can I come back rn?
                        </p>
                        <span>1 min ago.</span>
                    </div>
                </div>

                <div ref={endRef}>

                </div>
            </div>
            <div className="chat__bottom">
                <div className="chat__bottom__icons">
                    <img src="./img.png" alt="img"/>
                    <img src="./camera.png" alt="camera"/>
                    <img src="./mic.png" alt="mic"/>
                </div>
                <input value={text} type="text" placeholder="Type a message..." onClick={handleInputChange}
                       onChange={handleInputChange}/>
                <div className="chat__bottom__emoji">
                    <img onClick={() => setEmojiPicking(!emojiPicking)} src="./emoji.png" alt="emoji"/>
                    <div className="chat__bottom__emoji__pickerContainer">
                        <EmojiPicker open={emojiPicking} onEmojiClick={handleEmojiChoice}/>
                    </div>
                </div>
                <button className="chat__bottom__send">Send</button>
            </div>
        </div>
    );
};

export default Chat;
