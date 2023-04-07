import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDNrxeD-n1IqPIRsz1SO1fhVQM5NyHjNuw",
  authDomain: "saylani-discount-store-4a77b.firebaseapp.com",
  projectId: "saylani-discount-store-4a77b",
  storageBucket: "saylani-discount-store-4a77b.appspot.com",
  messagingSenderId: "250388014070",
  appId: "1:250388014070:web:3a49dba708c8c4508bddd7",
  measurementId: "G-M09JD22TN1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const storage = getStorage(app)

export {
    db,
    auth
}