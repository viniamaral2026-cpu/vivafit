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

// SIMULATED: Firebase is temporarily disabled to allow UI development without a backend.
let app, auth, db;
try {
    // app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    // auth = getAuth(app);
    // db = initializeFirestore(app, {
    //   localCache: memoryLocalCache()
    // });
    console.log("Firebase is currently disabled. Running in offline/simulation mode.");
} catch (e) {
    console.error("Firebase initialization failed. Running in offline mode.");
}


export { app, auth, db };
