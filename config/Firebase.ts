import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAJ-chUcXUdKUYpRONWtZLMFhM2MSf2PQs",
    authDomain: "todos-nextjs-firebase.firebaseapp.com",
    // databaseURL: "https://todos-nextjs-firebase-default-rtdb.firebaseio.com",
    projectId: "todos-nextjs-firebase",
    storageBucket: "todos-nextjs-firebase.appspot.com",
    messagingSenderId: "1020320011001",
    appId: "1:1020320011001:web:68c2d35950fbf7e82b0828",
    measurementId: "G-HE8E3G5ERN"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
// file > storage > get download url -> firestore db