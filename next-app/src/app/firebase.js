// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOopwWmx-Y28dvyoU070AiyJk1PV9AHOM",
  authDomain: "hhs-cap.firebaseapp.com",
  projectId: "hhs-cap",
  storageBucket: "hhs-cap.appspot.com",
  messagingSenderId: "637040098581",
  appId: "1:637040098581:web:8b2deea8503ce3fe193d1c",
  measurementId: "G-T8DWSY5DZP"
};

// Initialize Firebase
// const analytics = getAnalytics(app);


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;