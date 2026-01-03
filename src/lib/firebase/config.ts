// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, memoryLocalCache } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-6173913974-5ee2c",
  "appId": "1:813921240014:web:bf4427de3570ffdac8a19f",
  "apiKey": "AIzaSyChH3EGkge_EPXklLdXLFgkmD9gfOHJztM",
  "authDomain": "studio-6173913974-5ee2c.firebaseapp.com",
  "storageBucket": "studio-6173913974-5ee2c.appspot.com",
  "messagingSenderId": "813921240014"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Firestore with memory cache
const db = initializeFirestore(app, {
  localCache: memoryLocalCache()
});


export { app, auth, db };
