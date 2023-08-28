// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpiije9mojY_15_kB1WGb6lzuzHbLMLxA",
  authDomain: "react-auth-a1201.firebaseapp.com",
  projectId: "react-auth-a1201",
  storageBucket: "react-auth-a1201.appspot.com",
  messagingSenderId: "827132399700",
  appId: "1:827132399700:web:0d6366da0341017a6a1dc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
