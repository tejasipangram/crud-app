// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";

import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsfskShMkUjr8C8ebbmp0VFSSEUhI2H8I",

  authDomain: "react-app-65bb6.firebaseapp.com",

  projectId: "react-app-65bb6",

  storageBucket: "react-app-65bb6.appspot.com",

  messagingSenderId: "11916942817",

  appId: "1:11916942817:web:df994f0d3e8310f23a46a0",

  measurementId: "G-JGFLP0FKGE",
};

// Initialize Firebase
//
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export const gitHubProvider = new GithubAuthProvider();
