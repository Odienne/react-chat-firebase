import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-92ed8.firebaseapp.com",
    projectId: "reactchat-92ed8",
    storageBucket: "reactchat-92ed8.appspot.com",
    messagingSenderId: "971635602954",
    appId: "1:971635602954:web:277535842e0c1c7e5911f3"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
