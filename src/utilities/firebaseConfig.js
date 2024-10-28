import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpz1ktavfDA4v9CvHHC_E4G30KD9yG-lQ",
    authDomain: "courseschedulertutorial.firebaseapp.com",
    projectId: "courseschedulertutorial",
    storageBucket: "courseschedulertutorial.appspot.com",
    messagingSenderId: "41391965502",
    appId: "1:41391965502:web:af487d6b4a41682b3b186f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };