// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "studio-6173913974-5ee2c",
  "appId": "1:813921240014:web:bf4427de3570ffdac8a19f",
  "apiKey": "AIzaSyChH3EGkge_EPXklLdXLFgkmD9gfOHJztM",
  "authDomain": "studio-6173913974-5ee2c.firebaseapp.com",
  "storageBucket": "studio-6173913974-5ee2c.appspot.com",
  "messagingSenderId": "813921240014"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
