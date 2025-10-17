// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWZ9qt0zq0ngjJT_xh5e_CAveq3baBdfc",
  authDomain: "netflixgpt-21b53.firebaseapp.com",
  projectId: "netflixgpt-21b53",
  storageBucket: "netflixgpt-21b53.firebasestorage.app",
  messagingSenderId: "1008431058433",
  appId: "1:1008431058433:web:8b6f17cd73a2efff1bba00",
  measurementId: "G-E901NR1HPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); // this line is extra, so that we can use it again and again
// Configuration file for firebase