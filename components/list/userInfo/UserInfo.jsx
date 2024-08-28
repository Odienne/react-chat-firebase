import "./userInfo.css"
import {useUserStore} from "../../../lib/userStore.js";
import {auth} from "../../../lib/firebase.js";

const UserInfo = () => {

    const {currentUser} = useUserStore();

    return (
        <div className="userInfo">
            <div className="userInfo__user">
                <img src={currentUser.avatarUrl ? currentUser.avatarUrl : "./avatar.png"} alt="avatar"/>
                <h2>{currentUser.username}</h2>
            </div>
            <div className="userInfo__icons">
                <img src="./more.png" alt="more"/>
                <img src="./video.png" alt="video"/>
                <img src="./edit.png" alt="edit"/>
                <img onClick={() => auth.signOut()} src="./exit.png" alt="exit"/>
            </div>
        </div>
    );
};

export default UserInfo;
