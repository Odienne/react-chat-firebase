import "./userInfo.css"

const UserInfo = () => {
    return (
        <div className="userInfo">
            <div className="userInfo__user">
                <img src="./avatar.png" alt="avatar"/>
                <h2>Jong Kimchi</h2>
            </div>
            <div className="userInfo__icons">
                <img src="./more.png" alt="more"/>
                <img src="./video.png" alt="video"/>
                <img src="./edit.png" alt="edit"/>
            </div>
        </div>
    );
};

export default UserInfo;
