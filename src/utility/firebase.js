// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// const firebaseConfig = {
//   apiKey: AIzaSyA5rn9rxVDnZBxbmnRh6mRNx98Gi24cpl4,
//   authDomain: clone-ef3f0.firebaseapp.com,
//   projectId: clone-ef3f0,
//   storageBucket: clone-ef3f0.firebasestorage.app,
//   messagingSenderId: 165706638253,
//   appId: 1:165706638253:web:761bada57ff322e3fc7724,
// };
const firebaseConfig = {

apiKey: "AIzaSyA5rn9rxVDnZBxbmnRh6mRNx98Gi24cpl4",

authDomain: "clone-ef3f0.firebaseapp.com",

projectId: "clone-ef3f0",

storageBucket: "clone-ef3f0.firebasestorage.app",

messagingSenderId: "165706638253",

appId: "1:165706638253:web:761bada57ff322e3fc7724",

};

// VITE_FIREBASE_API_KEY=AIzaSyA5rn9rxVDnZBxbmnRh6mRNx98Gi24cpl4
// VITE_FIREBASE_AUTH_DOMAIN=clone-ef3f0.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=clone-ef3f0
// VITE_FIREBASE_STORAGE_BUCKET=clone-ef3f0.firebasestorage.app
// VITE_FIREBASE_MESSAGING_SENDER_ID=165706638253
// VITE_FIREBASE_APP_ID=1:165706638253:web:761bada57ff322e3fc7724


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
