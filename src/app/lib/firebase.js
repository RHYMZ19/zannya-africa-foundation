// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj-BCOPLsczmTOqAM3RL_ipqlCcJ3ivdg",
  authDomain: "zannya-website.firebaseapp.com",
  projectId: "zannya-website",
  storageBucket: "zannya-website.firebasestorage.app",
  messagingSenderId: "1081621983795",
  appId: "1:1081621983795:web:58d4f2ef9a789f13746946",
  measurementId: "G-9CV01FBRCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default db;