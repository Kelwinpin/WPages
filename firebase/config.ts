// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMMRnoCLke2nJLEHVs3CpDrAGSuWr9ysY",
  authDomain: "wpages-6798e.firebaseapp.com",
  projectId: "wpages-6798e",
  storageBucket: "wpages-6798e.firebasestorage.app",
  messagingSenderId: "260773835857",
  appId: "1:260773835857:web:f52564e6dd5c1d9315f470",
  measurementId: "G-M8FVR4P057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
