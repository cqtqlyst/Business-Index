// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLt2M0z3CGtg2OjNfGITJSaLa68d-0Qzc",
    authDomain: "hhs-capv2.firebaseapp.com",
    projectId: "hhs-capv2",
    storageBucket: "hhs-capv2.appspot.com",
    messagingSenderId: "602131782143",
    appId: "1:602131782143:web:746e572e0aaf2a49f6afca",
    measurementId: "G-X9GH6DYVLN"
  };

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storage = getStorage(app);
export const auth = getAuth(app);
export default db;