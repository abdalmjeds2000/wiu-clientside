import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQSJdPu2K6IzvE0GNS6lpnljc-_7QZ75Q",
  authDomain: "wiu-app-cc481.firebaseapp.com",
  projectId: "wiu-app-cc481",
  storageBucket: "wiu-app-cc481.appspot.com",
  messagingSenderId: "425264612055",
  appId: "1:425264612055:web:4ffd0fffbdef22a466e692",
  measurementId: "G-BE6G5N9E65"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);