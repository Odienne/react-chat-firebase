import {useState} from "react";
import "./login.css"
import {toast} from "react-toastify";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const handleAvatarUpload = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (
        <div className="loginContainer">
            <div className="login">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button>Sign in</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="signup">
                <h2>Create account</h2>
                <form>
                    <img src={avatar.url || "./avatar.png"} alt="avatar"/>
                    <label htmlFor="file">Upload avatar</label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatarUpload}/>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="text" placeholder="Username" name="username"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Login
