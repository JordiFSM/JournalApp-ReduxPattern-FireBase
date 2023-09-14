// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgRJoDagi1ajctYQIorc8zTXXIhWGOtSg",
  authDomain: "react-journalapp-439c0.firebaseapp.com",
  projectId: "react-journalapp-439c0",
  storageBucket: "react-journalapp-439c0.appspot.com",
  messagingSenderId: "834089958748",
  appId: "1:834089958748:web:cf0149cb486ca845e45599"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );