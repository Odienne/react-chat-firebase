import {useState} from "react";
import "./login.css"
import {toast} from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db} from "../../lib/firebase.js";
import upload from "../../lib/upload.js";


const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const [loading, setLoading] = useState(false);

    const handleAvatarUpload = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Welcome !");
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const {username, email, password} = Object.fromEntries(formData);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = avatar.file != null ? await upload(avatar.file) : null;

            const data = {
                username,
                email,
                avatarUrl: imgUrl,
                id: response.user.uid,
                blocked: [],
            };

            await setDoc(doc(db, "users", response.user.uid), data);


            await setDoc(doc(db, "usersChat", response.user.uid), {chats: []});

            await handleLogin(e);

        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="loginContainer">
            <div className="login">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading..." : "Sign in"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="signup">
                <h2>Create account</h2>
                <form onSubmit={handleRegistration}>
                    <img src={avatar.url || "./avatar.png"} alt="avatar"/>
                    <label htmlFor="file">Upload avatar</label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatarUpload}/>
                    <input type="text" required placeholder="Email" name="email"/>
                    <input type="text" required placeholder="Username" name="username"/>
                    <input type="password" required placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading..." : "Sign up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login
