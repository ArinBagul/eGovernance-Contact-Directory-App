// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSCJZYUQvQZ7_ZP_nSUqbqGtFVz6WF-Ho",
  authDomain: "egovernance-cf66d.firebaseapp.com",
  databaseURL: "https://egovernance-cf66d-default-rtdb.firebaseio.com",
  projectId: "egovernance-cf66d",
  storageBucket: "egovernance-cf66d.appspot.com",
  messagingSenderId: "22310314453",
  appId: "1:22310314453:web:1cb78be2d297389d0f9d5c",
  measurementId: "G-D7TZ864CW3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);