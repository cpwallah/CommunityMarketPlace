// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPoJaPQ9Y91ATAzXingPirjwtb2daRBUc",
  authDomain: "marketplace-beaa8.firebaseapp.com",
  projectId: "marketplace-beaa8",
  storageBucket: "marketplace-beaa8.appspot.com",
  messagingSenderId: "50189260936",
  appId: "1:50189260936:web:95d8cce62f3b62ec9e673d",
  measurementId: "G-YGD6CZ6G5S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
