// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA5rn9rxVDnZBxbmnRh6mRNx98Gi24cpl4",
  authDomain: "clone-ef3f0.firebaseapp.com",
  projectId: "clone-ef3f0",
  storageBucket: "clone-ef3f0.firebasestorage.app",
  messagingSenderId: "165706638253",
  appId: "1:165706638253:web:761bada57ff322e3fc7724",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
