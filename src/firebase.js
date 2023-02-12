import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA-c64sZi9OMSxd62x7Uqqrr5q7j9twqp8",
    authDomain: "saylani-discount-store.firebaseapp.com",
    projectId: "saylani-discount-store",
    storageBucket: "saylani-discount-store.appspot.com",
    messagingSenderId: "894053857018",
    appId: "1:894053857018:web:1d273446b2eea6916f3b43",
    measurementId: "G-WMV8VB2385"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const storage = getStorage(app)

export {
    db,
    auth
}