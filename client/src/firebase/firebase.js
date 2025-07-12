import {getAuth, GoogleAuthProvider} from 'firebase/auth'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYzlqKkrVbj6O6oJj_PTjVmb5MEm46Qeo",
  authDomain: "odoo-hackathon-48d14.firebaseapp.com",
  projectId: "odoo-hackathon-48d14",
  storageBucket: "odoo-hackathon-48d14.firebasestorage.app",
  messagingSenderId: "455143184017",
  appId: "1:455143184017:web:c3bc54392b8dfac2b59130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}